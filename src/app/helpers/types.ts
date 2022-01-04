export type Ref = React.MutableRefObject<any>;
export type MouseOverEvent = React.MouseEvent<HTMLTableCellElement, MouseEvent>;
export type DragEvent = React.DragEvent<HTMLTableCellElement>;

export type ClassName =
  | 'start unvisited'
  | 'start visited'
  | 'start shortest-path'
  | 'end unvisited'
  | 'end visited'
  | 'end shortest-path'
  | 'visited'
  | 'unvisited'
  | 'wall'
  | 'target unvisited'
  | 'target visited'
  | 'target shortest-path'
  | 'weight unvisited'
  | 'weight visited'
  | 'weight shortest-path'
  | 'shortest-path';
