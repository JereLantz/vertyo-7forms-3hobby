import { useContext, useActionState } from "react";
import { HobbyContext } from "../context/HobbyTrackerContext";
import Submit from "./Submit";

export default function AddHobbyForm(){
    const {addHobby} = useContext(HobbyContext)

    async function addHobbyAction(_,formData){
        const errors = []

        const hobbyName = formData.get("name")
        const desc = formData.get("desc")
        const level = formData.get("level")

        if(hobbyName.trim().length < 2){
            errors.push("Please enter name for the hobbie. Atlest 2 characters")
        }

        if(desc.trim().length < 5){
            errors.push("Please enter description for the hobby. Atleast 5 characters")
        }

        if(errors.length > 0){
            return {errors, enteredValues:{
                hobbyName,
                desc,
                level,
            }}
        }

        const newHobby = {
            hobbyName,
            desc,
            level,
        }

        const response = await addHobby(newHobby)
        console.log(response)
        if(!response.success){
            console.log("error")
            errors.push("Network error. Please try again later.")
            return {errors, enteredValues:{
                hobbyName,
                desc,
                level,
            }}
        }
        return {errors:null}
    }

    const [formState, formAction] = useActionState(addHobbyAction, {erros:null})

    return(
        <form action={formAction}>
        <p>
        <label htmlFor="hobbyName">Enter name of the hobby: </label>
        <input id="hobbyName" name="name" placeholder="Name" defaultValue={formState.enteredValues?.hobbyName}/>
        </p>
        <p>
        <label htmlFor="hobbyDesc" >Enter description: </label>
        <input id="hobbyDesc" name="desc" placeholder="Description" defaultValue={formState.enteredValues?.desc}/>
        </p>
        <p>
        <select name="level">
            <option>beginner</option>
            <option>intermediate</option>
            <option>Advanced</option>
        </select>
        </p>
        {formState.errors && <ul>
            {formState.errors.map((er)=> <li key={er}>{er}</li>)}
            </ul>}
        <Submit>Submit</Submit>
        </form>
    )
}
