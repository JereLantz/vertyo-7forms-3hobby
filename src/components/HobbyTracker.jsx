import { HobbyContext } from "../context/HobbyTrackerContext"
import { use } from "react"

export default function HobbyTracker(){
    const {hobbies, deleteHobby} = use(HobbyContext)

    return(
        <>
        {hobbies &&(
        <div>
            <ul>
                {hobbies.map((hobby)=><li key={hobby.id}>
                    {hobby.hobbyName}, {hobby.desc}, {hobby.level}
                    <button onClick={()=>deleteHobby(hobby.id)}>Delete</button>
                    </li>)}
            </ul>
        </div>)
            }
        </>
    )
}
