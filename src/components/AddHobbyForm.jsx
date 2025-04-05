import { useContext, useActionState } from "react";
import { HobbyContext } from "../context/HobbyTrackerContext";
import Submit from "./Submit";

export default function AddHobbyForm(){
    const {addHobby} = useContext(HobbyContext)

    const [formState, formAction] = useActionState(addHobbyAction, {erros:null})

    function addHobbyAction(_,formData){
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

        const newHobby = {
            hobbyName,
            desc,
            level,
        }

        if(errors.length > 0){
            return {errors, enteredValues:{
                hobbyName,
                desc,
                level,
            }}
        }
        console.log(errors)

        console.log(newHobby)
        const response = addHobby(newHobby)
        //TODO: tää voi errorata
        return {errors:null}
    }

    return(
        <form action={formAction}>
        <p>
        <label htmlFor="hobbyName">Enter name of the hobby: </label>
        <input id="hobbyName" name="name" placeholder="Name"/>
        </p>
        <p>
        <label htmlFor="hobbyDesc" >Enter description: </label>
        <input id="hobbyDesc" name="desc" placeholder="Description"/>
        </p>
        <p>
        <select name="level">
            <option>beginner</option>
            <option>intermediate</option>
            <option>Advanced</option>
        </select>
        </p>
        <Submit>Submit</Submit>
        </form>
    )
}
