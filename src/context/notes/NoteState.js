import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState= (props)=>{
    const host="http://localhost:5000"
    const notesInitial=[]

    const [notes, setNotes] = useState(notesInitial);
    

    const getNotes= async ()=>{

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMjkzODA3OTlhNjI3NzNkYzBjMDZmIn0sImlhdCI6MTY4MTAzODE3M30.-Dhreua-46tcaGWQHIX3Si4sief6YnEJRc6h0sRPxb4"
            },
          });
          const json=await response.json()
          setNotes(json[0]);
    }


    // add note
    const addNote= async (title,description,tag)=>{



        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMjkzODA3OTlhNjI3NzNkYzBjMDZmIn0sImlhdCI6MTY4MTAzODE3M30.-Dhreua-46tcaGWQHIX3Si4sief6YnEJRc6h0sRPxb4"
            },
            body: JSON.stringify({title,description,tag}),
          });

        const note=await response.json();
        setNotes(notes.concat(note))
    }
    // delete a note
    const deleteNote= async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMjkzODA3OTlhNjI3NzNkYzBjMDZmIn0sImlhdCI6MTY4MTAzODE3M30.-Dhreua-46tcaGWQHIX3Si4sief6YnEJRc6h0sRPxb4"
          },
        });
        const json=await response.json();
        let newNotes=notes.filter((note)=>{return note._id===id})
        setNotes(newNotes);
    }
    // edit a note
    const editNote= async  (id,title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMjkzODA3OTlhNjI3NzNkYzBjMDZmIn0sImlhdCI6MTY4MTAzODE3M30.-Dhreua-46tcaGWQHIX3Si4sief6YnEJRc6h0sRPxb4"
            },
            body: JSON.stringify({title,description,tag}),
          });
        const json=response.json();


        let newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
              newNotes[index].title=title;
              newNotes[index].description=description;
              newNotes[index].tag=tag;
              break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,getNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;