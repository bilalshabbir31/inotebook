import {React,useContext, useEffect} from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";

function Notes() {

    const context = useContext(noteContext);
  
    const {notes,getNotes}=context;

    useEffect(() => {
      getNotes();
    },[]);
    

    return (
        <>
            <AddNote/>
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map((note)=>{
                return <NoteItem note={note}/>
                })}
            </div>
        </>
    );
}

export default Notes;
