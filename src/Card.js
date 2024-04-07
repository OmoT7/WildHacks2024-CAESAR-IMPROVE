import React from "react";
import "./cards.css"

function Card(props){
    return(
        <div className="card">
            <img src ={props.image} />
            <h2>{props.name}</h2>
            <p>{props.des}</p>
        </div>
    )
}

export default Card;