package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

type hobby struct{
	Id int `json:"id"`
	Name string `json:"hobbyName"`
	Desc string `json:"desc"`
	Level string `json:"level"`
}

func parseJSONHobbyBody(r *http.Request) (hobby, error){
	var newHobby hobby

	err := json.NewDecoder(r.Body).Decode(&newHobby)
	defer r.Body.Close()

	return newHobby, err
}

func handleAddNewHobby(db *sql.DB, w http.ResponseWriter, r *http.Request){
	//TODO: lähetä takas vastaus objekti?
	newHobby, err := parseJSONHobbyBody(r)
	if err != nil {
		http.Error(w,`{"error":"Error parsing the data"}`, 400)
		log.Printf("Error parsing request body to the struct %s\n", err)
		return
	}

	addNewQuery := `
	INSERT INTO hobbies (name, description, level)
	values (?, ?, ?);
	`

	_, err = db.Exec(addNewQuery, newHobby.Name, newHobby.Desc, newHobby.Level)
	if err != nil {
		http.Error(w,`{"error":"Error parsing the data"}`, 500)
		log.Printf("error inserting new hobby to the database %s\n", err)
		return
	}

	w.WriteHeader(200)
}

func handleDeleteHobby(db *sql.DB, w http.ResponseWriter, r *http.Request){
	//TODO:
}

func handleGetAllHobbies(db *sql.DB, w http.ResponseWriter){
	var hobbies []hobby

	getAllQuery := `
	SELECT * FROM hobbies;
	`
	row, err := db.Query(getAllQuery)
	defer row.Close()
	if err != nil{
		w.WriteHeader(500)
		log.Printf("Error executing get all query %s\n", err)
		return
	}

	for row.Next(){
		var newHobby hobby
		err := row.Scan(&newHobby.Id, &newHobby.Name, &newHobby.Desc, &newHobby.Level)
		if err != nil{
			w.WriteHeader(500)
			log.Printf("error scanning a row %s\n",err)
			return
		}

		hobbies = append(hobbies, newHobby)
	}

	jsonData, err := json.Marshal(hobbies)
	if err != nil{
		w.WriteHeader(500)
		log.Printf("error marhaling data to json %s\n",err)
		return
	}

	w.WriteHeader(200)
	w.Write(jsonData)
}

func connectDB() (*sql.DB, error){
	db, err := sql.Open("sqlite3", "database.db")
	if err != nil{
		return nil, err
	}

	err = db.Ping()
	if err != nil{
		return nil, err
	}

	return db, nil
}

func initializeDBScema(db *sql.DB) error{
	initQuery := `
	CREATE TABLE IF NOT EXISTS hobbies (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		description TEXT NOT NULL,
		level TEXT NOT NULL
	);
	`
	_, err := db.Exec(initQuery)
	if err != nil{
		return err
	}

	return nil
}


func main(){
	handler := http.NewServeMux()
	server := http.Server{
		Addr: ":42069",
		Handler: handler,
	}

	db, err := connectDB()
	if err != nil{
		log.Fatalf("Error connecting to the database %s\n", err)
	}

	err = initializeDBScema(db)
	if err != nil{
		log.Fatalf("Erro creating the database schema %s\n", err)
	}

	handler.HandleFunc("POST /api/addnewhobby", func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(1 * time.Second)
		handleAddNewHobby(db, w, r)
	})
	handler.HandleFunc("GET /api/getallhobbies", func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(1 * time.Second)
		handleGetAllHobbies(db, w)
	})
	handler.HandleFunc("DEL /api/deletehobby/{id}", func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(1 * time.Second)
		handleDeleteHobby(db, w, r)
	})

	log.Printf("Server started on port %s\n", server.Addr)
	log.Fatal(server.ListenAndServe())
}
