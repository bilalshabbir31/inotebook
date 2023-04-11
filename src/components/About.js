import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";


const About = () => {
  const a= useContext(noteContext)

  useEffect(() => {
    a.update();
  }, []);
  
  

  return (
    <div>
        About {a.state.name}
    </div>
  );
};

export default About;
