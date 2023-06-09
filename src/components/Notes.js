import { React, useContext, useEffect, useRef,useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

function Notes(props) {

    const context = useContext(noteContext);

    const { notes, getNotes,editNote } = context;

    const [note, setNote] = useState({utitle:"",udescription:"",utag:"default"});

    let history=useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }else{
            history("/login")
        }
    }, []);

    const ref = useRef("");
    const refclose = useRef("");

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({id:currentnote._id,utitle:currentnote.title,udescription:currentnote.description,utag:currentnote.tag});
    }

    const handleClick=(e)=>{
        console.log("update",note);
        editNote(note.id,note.utitle,note.udescription,note.utag);
        refclose.current.click();
        props.showAlert("Update Successfully","success")
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="utitle" value={note.utitle} name="utitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="udescription" value={note.udescription} name="udescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="utag" value={note.utag} name="utag" onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.utitle.length<5||note.udescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-2"> 
                    {notes.length===0 && 'no notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem showAlert={props.showAlert} note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    );
}

export default Notes;
