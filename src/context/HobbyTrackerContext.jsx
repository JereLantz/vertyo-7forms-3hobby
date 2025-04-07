import { useEffect, useState } from "react";
import { createContext } from "react";

export const HobbyContext = createContext({
    hobbies:[],
    addHobby: ()=>{},
    deleteHobby: ()=>{},
    deleteAllHobbies: ()=>{},
})

export default function HobbyContextProvider({children}){
    const [hobbies, setHobbies] = useState([])

    useEffect(()=>{
        /*
        async function getSavedHobbies(){
            const response = await fetch("http://localhost:42069/api/getallhobbies")

            const resData = await response.json()

            if(!resData){
                setHobbies([])
                return
            }
            setHobbies(resData)
            console.log(resData)
        }*/

        getSavedHobbies()
    },[])

    async function getSavedHobbies(){
        const response = await fetch("http://localhost:42069/api/getallhobbies")

        const resData = await response.json()

        if(!resData){
            setHobbies([])
            return
        }
        setHobbies(resData)
        console.log(resData)
    }

    async function addHobby(newHobby){
        if(Math.random()<0.2){
            console.log("random")
            throw new Error("Failed to add because random")
        }

        const response = await fetch("http://localhost:42069/api/addnewhobby",{
            method: "POST",
            body: JSON.stringify(newHobby),
            headers:{
                'Content-Type':'application/json',
            }
        })
        
        if(!response.ok){
            throw new Error("Failed to add")
        }
        //setHobbies((p)=>[...p,newHobby])
        getSavedHobbies()
    }

    async function deleteHobby(id){
        const response = await fetch(`http://localhost:42069/api/deletehobby/${id}`,{
            method:"DELETE",
        })
        if(!response.ok){
            return {success:false}
        }

        setHobbies((p)=>p.filter((h)=>h.id !== id))

        return {success:true}
    }

    async function deleteAllHobbies(){
        console.log("delete all")
        const response = await fetch("http://localhost:42069/api/deleteallhobbies",{
            method:"DELETE",
        })

        if(!response.ok){
            throw new Error("Failed to delete all hobbies")
        }

        setHobbies([])
    }

    const ctxValue = {
        hobbies:hobbies,
        addHobby,
        deleteHobby,
        deleteAllHobbies,
    }

    return(
        <HobbyContext.Provider value={ctxValue}>
        {children}
        </HobbyContext.Provider>
    )
}
