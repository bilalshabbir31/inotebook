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
          console.log(json); 
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

        console.log("Adding a new note");
        const note={
            "_id": "6432a886fec5260fb11d3794aa34",
            "user": "64329380799a62773dc0c06f",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-04-09T11:59:02.751Z",
            "__v": 0
            };
        setNotes(notes.concat(note))
    }
    // delete a note
    const deleteNote= async (id)=>{
        console.log("Deleting the note with id"+id);
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMjkzODA3OTlhNjI3NzNkYzBjMDZmIn0sImlhdCI6MTY4MTAzODE3M30.-Dhreua-46tcaGWQHIX3Si4sief6YnEJRc6h0sRPxb4"
          },
        });
        const json=response.json();
        console.log(json);
        let newNotes=notes.filter((note)=>{return note._id===id})
        setNotes(newNotes);
    }
    // edit a note
    const editNote= async  (id,title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMjkzODA3OTlhNjI3NzNkYzBjMDZmIn0sImlhdCI6MTY4MTAzODE3M30.-Dhreua-46tcaGWQHIX3Si4sief6YnEJRc6h0sRPxb4"
            },
            body: JSON.stringify({title,description,tag}),
          });
        const json=response.json();
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element.id===id){
                element.title=title;
                element.description=description;
                element.tag=tag;
            }
        }
    }


    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,getNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;