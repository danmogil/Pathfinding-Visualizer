import { Component } from 'react';

import '../styles/cell.css';

interface Props {

}

class Cell extends Component<Props> {
  static cellSizePX = 35;

//   constructor(props: Props) {
//       super(props);
//   }

  render() {
    return <td className="cell" />;
  }
}

export default Cell;

//starting 
//visited 
// end
// wall
// target
// shortest path
// unvisited