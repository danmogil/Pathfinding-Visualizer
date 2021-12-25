import '../styles/nav.css';

import { Ref } from '../helpers/types';

interface Props {
  navRef: Ref;
}

const Nav: React.FC<Props> = ({ navRef }) => {
  return (
    <div id="nav" ref={navRef}>
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
        <button>Add Target</button>
        <button>Visualize</button>
        <button>Clear</button>
      </div>
    </div>
  );
};

export default Nav;
