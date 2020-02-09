import React, {
  Component
} from 'react';

import Cell from './Cell';
class Board extends Component {



  state = {
    boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
    mineCount: this.props.mines,
    startgame: false
  }


   startgame = ()=>{
    this.setState({ 
      boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
      mineCount:this.props.mines,
      startgame: true});
      this.props.reset();
  }


  // reveals the whole board
  revealBoard() {
    let updatedData = this.state.boardData;
    updatedData.map((datarow) => {
      return datarow.map((dataitem) => {
        return dataitem.isRevealed = true;
      });
    });
    this.setState({
      boardData: updatedData
    })
  }

  revealEmpty(x, y, data) {
    let area = this.traverseBoard(x, y, data);

    area.forEach((value) => {
      if (!value.isFlagged && !value.isRevealed) {
        // console.log(value);
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          this.revealEmpty(value.x, value.y, data);
        }

      }
    })
    return data;
  }

  createEmptyArray(height, width) {
    let data = [];

    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    return data;
  }


  plantMines(grid, height, width, mines) {
    let randomx, randomy, minesPlanted = 0;

    while (minesPlanted < mines) {
      randomx = Math.floor((Math.random() * height * width) % height);
      randomy = Math.floor((Math.random() * height * width) % width);


      if (grid[randomx][randomy].isMine === false) {
        grid[randomx][randomy].isMine = true;
        minesPlanted++;
      }
    }

    return (grid);
  }


  // here data is the 2d array object of the grid
  getNeighbours(data, height, width) {
    let updatedData = data;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
          area.forEach(value => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].neighbour = mine;
        }
      }
    }

    return (updatedData);
  };


  traverseBoard(x, y, data) {
    const el = [];

    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }

    //down
    if (x < this.props.height - 1) {
      el.push(data[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }

    //right
    if (y < this.props.width - 1) {
      el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < this.props.width - 1) {
      el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < this.props.height - 1 && y < this.props.width - 1) {
      el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < this.props.height - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }

    return el;
  }



  initBoardData(height, width, mines) {
    let grid = this.createEmptyArray(height, width);
    grid = this.plantMines(grid, height, width, mines);
    //console.log(grid)
    grid = this.getNeighbours(grid, height, width);

    return grid;
  }


  handleContextMenu(e, x, y) {
    e.preventDefault();
    let updatedData = this.state.boardData;
    let mines = this.state.mineCount;

    // check if already revealed
    if (updatedData[x][y].isRevealed) return;

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      mines++;
    } else {
      updatedData[x][y].isFlagged = true;
      mines--;
    }

    this.setState({
      boardData: updatedData,
      mineCount: mines,
    });
  }


  handleClick(x, y) {
    if (this.state.boardData[x][y].isMine) {
      this.revealBoard();


      const result = "Lost"

      this.props.gameresult(result);
      // alert("you found a bomb");
    }

    // when revealed then no flag
    // any one has to be true
    if (this.state.boardData[x][y].isRevealed || this.state.isFlagged) {
      return null
    }


    let updatedGrid = this.state.boardData;
    updatedGrid[x][y].isFlagged = false;
    updatedGrid[x][y].isRevealed = true;

    if (updatedGrid[x][y].isEmpty) {
      updatedGrid = this.revealEmpty(x, y, updatedGrid);
    }


    let mineArray = [];

    updatedGrid.forEach(datarow => {
      datarow.forEach((dataitem) => {
        if (!dataitem.isRevealed) {
          mineArray.push(dataitem);
        }
      });
    });


    //console.log(mineArray);

    if (mineArray.length === this.props.mines) {
      this.setState({
        mineCount: 0
      });
      this.revealBoard();

      const result = "Won"

      this.props.gameresult(result);
      // alert("You Win");

    }

    this.setState({
      boardData: updatedGrid,

    });

  }


  renderBoard(data) {
    return data.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          // 00,01,2,3,4,5,6...
          <div key={
            dataitem.x * datarow.length + dataitem.y
          } >
            <Cell value={
              dataitem
            }
              onClick={
                () => this.handleClick(dataitem.x, dataitem.y)
              }
              cMenu={
                (e) => this.handleContextMenu(e, dataitem.x, dataitem.y)
              }
            /> </div>
        )
      })

    })
  }

  render() {
    return (
      <div className="board">
        <div style={{ marginBottom: "5vmin" }}>
          <span className="info"> Mines remaining: {
            this.state.mineCount
          } </span>

        </div>
        {
          this.renderBoard(this.state.boardData)
        }
        <div>
          <button className="vibrate-1" onClick={this.startgame}>START GAME</button>
        </div>

      </div>


    );
  }
}

export default Board;