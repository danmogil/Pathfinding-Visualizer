import { Component } from 'react';
import '../styles/board.css';

import { Ref } from '../helpers/types';
import Cell from './Cell';
import { getRandomIntInclusive } from '../helpers/helpers';

interface Props {
  navRef: Ref;
}

interface State {
  boardDimensions: {
    numOfRows: Number;
    numOfColumns: Number;
  };
  cells: CellObj[][];
}

interface CellObj {
  row: Number;
  col: Number;
  isStart: Boolean;
  isEnd: Boolean;
}

class Board extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      boardDimensions: { numOfRows: 0, numOfColumns: 0 },
      cells: [],
    };
  }

  componentDidMount() {
    this.setBoardDimensions();
    // this.initCells();
    console.log('ran');
  }

  setBoardDimensions() {
    const navHeight = this.props.navRef.current.offsetHeight;
    const navWidth = this.props.navRef.current.offsetWidth;
    const cellSize = Cell.cellSizePX;
    this.setState({
      boardDimensions: {
        numOfRows: Math.trunc((window.innerHeight - navHeight) / cellSize),
        numOfColumns: Math.trunc(navWidth / cellSize),
      },
    }, this.initCells);
  }

  initCells() {
    const cells: CellObj[][] = [];
    const numOfRows = this.state.boardDimensions!.numOfRows;
    const numOfColumns = this.state.boardDimensions!.numOfColumns;
    const { row: startRow, col: startCol } = this.selectRandomCell(); //start node
    let endObj = this.selectRandomCell(); //end node

    while (endObj.row === startRow && endObj.col === startCol) {
      endObj = this.selectRandomCell();
    }

    for (let row = 1; row <= numOfRows; row++) {
      const currRow: CellObj[] = [];
      for (let col = 1; col <= numOfColumns; col++) {
        currRow.push({
          row,
          col,
          isStart: row === startRow && col === startCol,
          isEnd: row === endObj.row && col === endObj.col,
        });
      }
      cells.push(currRow);
    }
    this.setState({ cells });
  }

  selectRandomCell() {
    const numOfRows = this.state.boardDimensions!.numOfRows;
    const numOfColumns = this.state.boardDimensions!.numOfColumns;
    return {
      row: getRandomIntInclusive(1, numOfRows),
      col: getRandomIntInclusive(1, numOfColumns),
    };
  }

  render() {
    return (
      <table>
        {this.state.cells!.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((col, colIndex) => (
              <Cell key={`r${rowIndex}c${colIndex}`} />
            ))}
          </tr>
        ))}
      </table>
    );
  }
}

export default Board;
