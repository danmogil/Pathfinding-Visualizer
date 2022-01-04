import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/grid.css';

import { RootState } from '../store/store';
import { ClassName } from '../helpers/types';
import Cell from './Cell';

const Grid: FC = () => {
  const grid: ClassName[][] = useSelector(
    (state: RootState) => state.grid,
    (left, right) => left.length === right.length
  );
  // useEffect(() => console.log('grid rerender'))
  return (
    <table>
      <tbody>
        {grid.map((row, rowI) => (
          <tr key={rowI}>
            {row.map((className, colI) => {
              return (
                <Cell key={`r${rowI}c${colI}`} pos={{ row: rowI, col: colI }} />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
