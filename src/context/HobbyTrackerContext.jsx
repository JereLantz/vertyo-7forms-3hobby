import { useState } from "react";
import { createContext } from "react";

export const HobbyContext = createContext({
    hobbies:[],
    addHobby: ()=>{},
    deleteHobby: ()=>{}
})

export default function HobbyContextProvider({children}){
    const [hobbies, setHobbies] = useState([])
    function addHobby(newHobby){
        setHobbies((p)=>[...p,newHobby])
    }

    function deleteHobby(id){
        setHobbies((p)=>p.filter((h)=>h.id !== id))
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
