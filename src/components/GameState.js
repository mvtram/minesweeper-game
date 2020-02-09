import React from 'react';
import './GameState.css'
const GameState = (props)=> {
    var classArr = "swirl-in-fwd";
    var message = props.result;
    if(props.result === "Won"){
        classArr = classArr + " result";
        message = "congratulations you have won it!!"
    }else{
        classArr = classArr + " lost";
        message = "you have lost the game try again!!"
    }
        return(
            <div className="container">
            <div className={classArr}>
                <div className="resultname">
                {message}
                </div>
            </div>
            </div>
        
            )
    
    
}

export default GameState;