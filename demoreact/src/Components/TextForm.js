import React, { useState } from "react"


export default function Textform(props) {


    const handleUpper = () =>{
      if(text){
        setText(text.toUpperCase());
        return;
      }
      alert("Enter Text Pls");
    }
    const handleLower = () =>{
      if(text){
        setText(text.toLowerCase());
        return;
      }
      alert("Enter Text Pls");     
  }

  const handleCapitalize = () =>{
    if(text){
    setText(text.toLowerCase().split(' ').map(ch=> ch.charAt(0).toUpperCase() + ch.slice(1)).join(' '));
    return;
    }
    alert("Enter Text Pls")
}


const handleCopy= () =>{
  if(text){
  const textcopy = document.getElementById("exampleInputEmail1");
  textcopy.select();
  navigator.clipboard.writeText(textcopy.value);
  return;
  }
  alert("Enter Text Pls");

}
  

const handleClear = () =>{
  setText('');
}

    const handleChange = (event)=> {
        console.log("Onchange!!");
        setText(event.target.value);
    }
    
    const [text, setText] = useState(''); 
    return (
       
  <div className="mb-3 ">
    <label  className="form-label">{props.fieldLabel}</label>
    <textarea type="email" className="form-control" value= {text} onChange={handleChange} id="exampleInputEmail1" rows ="5" aria-describedby="emailHelp" ></textarea>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  <button className="btn btn-primary mx-2" onClick={handleUpper}>Convert to UpperCase</button>
  <button className="btn btn-primary mx-2" onClick={handleLower}>Convert to Lowercase</button>
  <button className="btn btn-primary mx-2" onClick={handleCapitalize}>Capitalized Case</button>
  {/* <button className="btn btn-primary mx-2"  onClick={handleAlternate}>Alternate Case</button>
  <button className="btn btn-primary mx-2" onClick={handleInverseCase}>Inverse Case</button> */}
  <button className="btn btn-primary mx-2" onClick={handleClear}>Clear</button>
  <button className="btn btn-primary mx-2" onClick={handleCopy}>Copy to Clipboard</button>

<div className="container">
  <h2>Text Summary</h2>
  {text.split(" ").length} words and {text.length} characters
  <h2>Preview</h2>
  <p>{text}</p>
  <h2>Read Time</h2>
  <b>{0.08 * text.split(" ").length} Minutes to Read</b>
  </div>
  </div>  
    );
}