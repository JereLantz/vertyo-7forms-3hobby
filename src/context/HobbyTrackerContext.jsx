import { useState } from "react";
import { createContext } from "react";

export const HobbyContext = createContext({
    hobbies:[],
    addHobby: ()=>{},
    deleteHobby: ()=>{}
})

export default function HobbyContextProvider({children}){
    const [hobbies, setHobbies] = useState([])

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
            //TODO:
            return {success:false}
        }
        setHobbies((p)=>[...p,newHobby])
        
        return {success:true}
    }

    function deleteHobby(id){
        setHobbies((p)=>p.filter((h)=>h.id !== id))

        return {success:true}
    }

    const ctxValue = {
        hobbies,
        addHobby,
        deleteHobby,
    }

    return(
        <HobbyContext.Provider value={ctxValue}>
        {children}
        </HobbyContext.Provider>
    )
}
