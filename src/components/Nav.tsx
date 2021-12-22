import '../styles/nav.css';

const Nav: React.FC = () => {
  return (
    <div className="nav">
      <h2>Pathfinding Visualizer</h2>
      <div className="options">
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
