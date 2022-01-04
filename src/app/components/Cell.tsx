import { FC } from 'react';
import '../styles/cell.css';

import { ClassName, DragEvent, MouseOverEvent } from '../helpers/types';
import store, { RootState } from '../store/store';
import { useSelector } from 'react-redux';

export const CELLSIZEpx = 30;

interface Props {
  pos: {
    row: number;
    col: number;
  };
}

let dragStartClass: ClassName;

const Cell: FC<Props> = ({ pos }) => {

  const className: ClassName = useSelector((state: RootState) => state.grid[pos.row][pos.col]);

  const handleMouseOver = (e: MouseOverEvent) => {
    const startsWith = ['unvisited', 'visited', 'shortest-path'];
    if (startsWith.some((x) => className.startsWith(x))) {
      if (e.shiftKey) { 
        store.dispatch({
          type: 'grid/updateCellClassName',
          payload: {
            newClass: 'wall',
            ...pos,
          },
        });
      } else if (e.altKey) {
        store.dispatch({
          type: 'grid/updateCellClassName',
          payload: {
            newClass: 'weight unvisited',
            ...pos,
          },
        });
      }
    }
  };

  const handleClick = () => {
    if (className === 'wall' || className.startsWith('weight')) {
      store.dispatch({
        type: 'grid/updateCellClassName',
        payload: {
          newClass: 'unvisited',
          ...pos,
        },
      });
    }
  };

  const handleDrag = (e: DragEvent) => {
    const dragEnterExclusions = ['start', 'end', 'target', 'wall', 'weight'];
    switch (e.type) {
      case 'dragstart': {
        const inclusions = ['start', 'end', 'target'];
        if (inclusions.some((inclusion) => className.startsWith(inclusion))) {
          dragStartClass = className;

          store.dispatch({
            type: 'grid/updateCellClassName',
            payload: {
              newClass: 'unvisited',
              ...pos,
            },
          });
        } else {
          e.preventDefault();
        }
        break;
      }
      case 'dragenter': {
        if (
          dragEnterExclusions.every(
            (exclusion) => !className.startsWith(exclusion)
          )
        ) {
          store.dispatch({
            type: 'grid/updateCellClassName',
            payload: {
              newClass: dragStartClass,
              ...pos,
            },
          });
        }
        break;
      }
      case 'dragleave': {
        if (className === dragStartClass) {
          store.dispatch({
            type: 'grid/updateCellClassName',
            payload: {
              newClass: 'unvisited',
              ...pos,
            },
          });
        }
        break;
      }
      case 'dragover': {
        const dragOverExclusions = dragEnterExclusions.filter(
          (exclusion) => !exclusion.startsWith(dragStartClass.split(' ')[0])
        );
        if (
          dragOverExclusions.every(
            (exclusion) => !className.startsWith(exclusion)
          )
        ) {
          e.preventDefault();
        }
        break;
      }
      case 'dragdrop': {
        store.dispatch({
          type: 'grid/updateCellClassName',
          payload: {
            newClass: dragStartClass,
            ...pos,
          },
        });
        break;
      }
      case 'dragend': {
        if (e.dataTransfer.dropEffect === 'none') {
          store.dispatch({
            type: 'grid/updateCellClassName',
            payload: {
              newClass: dragStartClass,
              ...pos,
            },
          });
        }
      }
    }
  };

  return (
    <td
      className={className}
      onMouseOver={(e) => handleMouseOver(e)}
      onClick={() => handleClick()}
      onDragStart={(e) => handleDrag(e)}
      onDragEnter={(e) => handleDrag(e)}
      onDragLeave={(e) => handleDrag(e)}
      onDragOver={(e) => handleDrag(e)}
      onDrop={(e) => handleDrag(e)}
      onDragEnd={(e) => handleDrag(e)}
    />
  );
};

export default Cell;
