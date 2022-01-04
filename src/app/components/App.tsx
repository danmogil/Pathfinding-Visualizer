import { FC } from 'react';

import '../styles/global.css'

import Nav from './Nav';
import Grid from './Grid';

const App: FC = () => (
  <>
    <Nav />
    <Grid />
    <div id="footer" />
  </>
);

export default App;
