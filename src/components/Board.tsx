import { Component } from 'react';
import '../styles/board.css';

import { Ref, CellSettings } from '../helpers/types';
import { getRandomIntInclusive } from '../helpers/helpers';
import Cell from './Cell';

interface Props {
  navRef: Ref;
}

interface State {
  boardDimensions: {
    numOfRows: Number;
    numOfColumns: Number;
  };
  cells: CellSettings[][];
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
  }

  setBoardDimensions() {
    const navHeight = this.props.navRef.current.offsetHeight;
    const navWidth = window.innerWidth;
    const cellSize = Cell.cellSizePX;
    this.setState(
      {
        boardDimensions: {
          numOfRows: (window.innerHeight - navHeight) / cellSize,
          numOfColumns: navWidth / cellSize,
        },
      },
      this.initCells
    );
  }

  initCells() {
    const cells: CellSettings[][] = [];
    const numOfRows = this.state.boardDimensions!.numOfRows;
    const numOfColumns = this.state.boardDimensions!.numOfColumns;
    const { row: startRow, col: startCol } = this.selectRandomCell(); //start node
    let endObj = this.selectRandomCell(); //end node

    while (endObj.row === startRow && endObj.col === startCol) {
      endObj = this.selectRandomCell();
    }

    for (let row = 1; row <= numOfRows; row++) {
      const currRow: CellSettings[] = [];
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
    let resizeTimeout: NodeJS.Timeout;
    window.onresize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => window.location.reload(), 100);
    };
    return (
      <table>
        {this.state.cells!.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((col, colIndex) => (
              <Cell key={`r${rowIndex}c${colIndex}`} settings={col} />
            ))}
          </tr>
        ))}
      </table>
    );
  }
}

export default Board;
