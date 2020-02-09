import React, { Component } from 'react';
import Board from "./Board";
import GameState from "./GameState";

class Minesweeper extends Component {

    state = {
        height: 6,
        width: 6,
        mines: 6,
        result: "",
       
      };
  
      resetgame = ()=>{
        this.setState({result: ""})
      }


      gameResultHandler = (res) =>{
        var result = res;
        console.log("message",res);
       this.setState({result: result});
      }


    render() { 
        const { height, width, mines } = this.state;
        const maxw = (width/2)*100;
        const message = this.state.result;
        var max = maxw.toString();
      
        return (
          <div>
            <div  className="game" style={{
              maxWidth: max+"px",
            }} >
            <Board 
            gameresult={(result) => this.gameResultHandler(result)} 
            reset = {this.resetgame}
            height={height}
            width={width} 
            mines={mines} />

            {message===""?null:<GameState result = {message}/>}
       
          </div>
         
          </div>
        
            );
    }
}
 
export default Minesweeper;