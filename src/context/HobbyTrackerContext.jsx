import { useEffect, useState } from "react";
import { createContext } from "react";

export const HobbyContext = createContext({
    hobbies:[],
    addHobby: ()=>{},
    deleteHobby: ()=>{},
})

export default function HobbyContextProvider({children}){
    const [hobbies, setHobbies] = useState([])

    useEffect(()=>{
        async function getSavedHobbies(){
            const response = await fetch("http://localhost:42069/api/getallhobbies")

            const resData = await response.json()

            setHobbies(resData)
        }

        getSavedHobbies()
    },[])

    async function addHobby(newHobby){
        if(Math.random()<0.2){
            console.log("random")
            return {success:false}
        }

        const response = await fetch("http://localhost:42069/api/addnewhobby",{
            method: "POST",
            body: JSON.stringify(newHobby),
            headers:{
                'Content-Type':'application/json',
            }
        })
        
        if(!response.ok){
            return {success:false}
        }
        setHobbies((p)=>[...p,newHobby])
        
        return {success:true}
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

    const ctxValue = {
        hobbies:hobbies,
        addHobby,
        deleteHobby,
    }

    return(
        <HobbyContext.Provider value={ctxValue}>
        {children}
        </HobbyContext.Provider>
    )
}
