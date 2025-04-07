import { HobbyContext } from "../context/HobbyTrackerContext"
import { use } from "react"

export default function HobbyTracker(){
    const {deleteAllHobbies,hobbies, deleteHobby} = use(HobbyContext)

    return(
        <div>
        <button onClick={deleteAllHobbies}>Delete all hobbies</button>
        {hobbies &&(
            <ul>
                {hobbies.map((hobby)=>(
                    <li key={hobby.id}>
                    {hobby.hobbyName}, {hobby.desc}, {hobby.level} 
                    <button onClick={()=>deleteHobby(hobby.id)}>Delete</button>
                    </li>))}
            </ul>
        )}
        </div>
    )
}
