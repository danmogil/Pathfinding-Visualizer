import { useRef } from 'react';

import '../styles/global.css';

import Nav from './Nav';
import Board from './Board';

const App: React.FC = () => {
  const navRef = useRef<HTMLDivElement>();
  return (
    <>
      <Nav navRef={navRef} />
      <Board navRef={navRef} />
    </>
  );
};

export default App;
