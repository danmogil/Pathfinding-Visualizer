import { createAction, createReducer } from '@reduxjs/toolkit';

import { Ref, ClassName } from '../helpers/types';
import { CELLSIZEpx } from '../components/Cell';
import { WritableDraft } from 'immer/dist/internal';

interface State {
  grid: ClassName[][];
  gridDimensions: any;
  targetCoor: { row: number; col: number } | null;
}

const initialState: State = {
  grid: [],
  gridDimensions: { numOfRows: -1, numOfColumns: -1 },
  targetCoor: null,
};

const initGridDimensions = createAction<Ref>('grid/initGridDimensions');
const initCells = createAction('grid/initCells');
const updateCellClassName = createAction<{
  row: number;
  col: number;
  newClass: ClassName;
}>('grid/updateCellClassName');
const toggleTarget = createAction('nav/toggleTarget');
const clearGrid = createAction('nav/clearGrid');

const storeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(initGridDimensions, (state, action) => {
      const navHeight = action.payload.current.offsetHeight;
      state.gridDimensions = {
        numOfRows: (window.innerHeight - navHeight) / CELLSIZEpx,
        numOfColumns: window.innerWidth / CELLSIZEpx,
      };
    })
    .addCase(initCells, (state) => {
      const grid: ClassName[][] = [];
      const { row: startRow, col: startCol } = selectRandomCell(state);
      let endNode = selectRandomCell(state);
      const { row: endRow, col: endCol } = endNode;

      while (endRow === startRow && endCol === startCol) {
        endNode = selectRandomCell(state);
      }

      for (let row = 1; row <= state.gridDimensions.numOfRows; row++) {
        const currRow: ClassName[] = [];
        for (let col = 1; col <= state.gridDimensions.numOfColumns; col++) {
          const isStart = row === startRow && col === startCol;
          const isEnd = row === endRow && col === endCol;
          currRow.push(
            isStart ? 'start unvisited' : isEnd ? 'end unvisited' : 'unvisited'
          );
        }
        grid.push(currRow);
      }
      state.grid = grid;
    })
    .addCase(updateCellClassName, (state, action) => {
      const { row, col, newClass } = action.payload;
      state.grid[row][col] = newClass;
    })
    .addCase(toggleTarget, (state) => {
      try {
        if (state.targetCoor) {
          const { row, col } = state.targetCoor;
          state.grid[row][col] = 'unvisited';
          state.targetCoor = null;
        } else {
          let coor = selectRandomCell(state);
          while (state.grid[coor.row][coor.col] !== 'unvisited') {
            coor = selectRandomCell(state);
          }
          state.grid[coor.row][coor.col] = 'target unvisited';
          state.targetCoor = coor;
        }
      } catch {
        console.log('Cannot add target: all cells are full');
      }
    })
    .addCase(clearGrid, (state) => {
      state.grid = state.grid.map((row) =>
        row.map((cell) => {
          if (cell.startsWith('start')) {
            cell = 'start unvisited';
          } else if (cell.startsWith('end')) {
            cell = 'end unvisited';
          } else {
            cell = 'unvisited';
          }
          return cell;
        })
      );
    });
});

function selectRandomCell(state: WritableDraft<State>) {
  return {
    row: getRandomIntInclusive(1, state.gridDimensions.numOfRows),
    col: getRandomIntInclusive(1, state.gridDimensions.numOfColumns),
  };
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default storeReducer;
