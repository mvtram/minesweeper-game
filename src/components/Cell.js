import React, { Component } from 'react';
class Cell extends Component {
   

getValue() {
    const { value } = this.props;

    if (value.isRevealed === false) {
        return this.props.value.isFlagged ? "F" : null;
      }
    if (value.isMine) {
        // for bomb X
        return "X";
    }
    if (value.neighbour === 0) {
        return null;
    }
    return value.neighbour;
}



    render() { 
        const { value, onClick, cMenu} = this.props;
        let className =
          "cell" +
          (value.isRevealed ? "" : " hidden") +
          (value.isMine ? " is-mine" : "") +
          (value.isFlagged ? " is-flag" : "");
    
        return (
          <div
            onClick={onClick}
            className={className}
            onContextMenu = {cMenu}
            >
            {this.getValue()}
          </div>
        );
    }
}
 
export default Cell;