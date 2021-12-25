import { Component } from 'react';
import '../styles/cell.css';

import { CellSettings } from '../helpers/types';

interface Props {
  settings: CellSettings;
}

interface State {
  class:
    | 'start'
    | 'end'
    | 'visited'
    | 'unvisited'
    | 'wall'
    | 'target'
    | 'shortest-path';
}

class Cell extends Component<Props, State> {
  static cellSizePX = 30;

  constructor(props: Props) {
    super(props);
    this.state = {
      class: this.props.settings.isStart
        ? 'start'
        : this.props.settings.isEnd
        ? 'end'
        : 'unvisited',
    };
  }

  render() {
    const { row, col, isStart, isEnd } = this.props.settings;
    return <td className={`cell ${this.state.class}`} />;
  }
}

export default Cell;
