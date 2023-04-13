import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState= (props)=>{

    const notesInitial=[

        {
        "_id": "6432a87cfec5260fb11d3792",
        "user": "64329380799a62773dc0c06f",
        "title": "my title",
        "description": "please wake up early",
        "tag": "personal",
        "date": "2023-04-09T11:58:52.503Z",
        "__v": 0
        },
        {
        "_id": "6432a886fec5260fb11d3794",
        "user": "64329380799a62773dc0c06f",
        "title": "my updated",
        "description": "please wsam updated up early",
        "tag": "Youtube",
        "date": "2023-04-09T11:59:02.751Z",
        "__v": 0
        },
        {
        "_id": "6432a87cfec5260fb11d3792",
        "user": "64329380799a62773dc0c06f",
        "title": "my title",
        "description": "please wake up early",
        "tag": "personal",
        "date": "2023-04-09T11:58:52.503Z",
        "__v": 0
        },
        {
        "_id": "6432a886fec5260fb11d3794",
        "user": "64329380799a62773dc0c06f",
        "title": "my updated",
        "description": "please wsam updated up early",
        "tag": "Youtube",
        "date": "2023-04-09T11:59:02.751Z",
        "__v": 0
        },
        {
        "_id": "6432a87cfec5260fb11d3792",
        "user": "64329380799a62773dc0c06f",
        "title": "my title",
        "description": "please wake up early",
        "tag": "personal",
        "date": "2023-04-09T11:58:52.503Z",
        "__v": 0
        },
        {
        "_id": "6432a886fec5260fb11d3794",
        "user": "64329380799a62773dc0c06f",
        "title": "my updated",
        "description": "please wsam updated up early",
        "tag": "Youtube",
        "date": "2023-04-09T11:59:02.751Z",
        "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);
    

    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;