import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Ref, ClassName } from '../../helpers/types';
import { CELLSIZEpx } from '../../components/Cell';
import { WritableDraft } from 'immer/dist/internal';

interface GridState {
  grid: ClassName[][];
  gridDimensions: any;
}

const initialState: GridState = {
  grid: [],
  gridDimensions: { numOfRows: -1, numOfColumns: -1 },
};

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    initGridDimensions(state, action: PayloadAction<Ref>) {
      const navHeight = action.payload.current.offsetHeight;
      state.gridDimensions = {
        numOfRows: (window.innerHeight - navHeight) / CELLSIZEpx,
        numOfColumns: window.innerWidth / CELLSIZEpx,
      };
    },
    initCells(state) {
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
    },
    updateCellClassName(
      state,
      action: PayloadAction<{ row: number; col: number; newClass: ClassName }>
    ) {
      const { row, col, newClass } = action.payload;
      state.grid[row][col] = newClass;
    },
  },
});

function selectRandomCell(state: WritableDraft<GridState>) {
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

export const { initGridDimensions, initCells } = gridSlice.actions;
export default gridSlice.reducer;
