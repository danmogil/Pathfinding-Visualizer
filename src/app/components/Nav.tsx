import { FC, useEffect, useRef } from 'react';
import '../styles/nav.css';

import { Ref } from '../helpers/types';
import { initGrid, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';

const Nav: FC = () => {
  const isTarget = useSelector((state: RootState) => state.targetCoor !== null);
  const ref: Ref = useRef<HTMLDivElement>();
  const dispatch = useDispatch();

  useEffect(() => {
    initGrid(ref);
    // console.log('nav rerender');
  }, []);

  let timeout: NodeJS.Timeout;
  window.onresize = function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      initGrid(ref);
      if (isTarget) {
        dispatch({ type: 'nav/toggleTarget' });
      }
    }, 100);
  };

  return (
    <>
      <div id="nav" ref={ref}>
        <h2>Pathfinding Visualizer</h2>
        <div id="options">
          <div className="dropdown">
            <span>Algorithms</span>
            <div className="dropdown-content">
              <button>AStar Search</button>
              <button>alg2</button>
              <button>alg3</button>
              <button>alg4</button>
            </div>
          </div>
          <div className="dropdown">
            <span>Mazes</span>
            <div className="dropdown-content">
              <button>maze1</button>
              <button>maze2</button>
              <button>maze3</button>
              <button>maze4</button>
            </div>
          </div>
          <button onClick={() => dispatch({ type: 'nav/toggleTarget' })}>
            {isTarget ? 'Remove Target' : 'Add Target'}
          </button>
          <button>Visualize</button>
          <button onClick={() => dispatch({ type: 'nav/clearGrid' })}>
            Clear
          </button>
          <button>Help</button>
        </div>
      </div>
    </>
  );
};

export default Nav;
