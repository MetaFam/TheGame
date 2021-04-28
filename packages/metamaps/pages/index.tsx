import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Loading } from '../components/Loading';
import { Menu } from '../components/Menu';
import { Popup } from '../components/Popup';
import { ThreeBox } from '../components/ThreeBox';
import { App } from '../styles/App';

declare const window: any;

export interface HomeProps {
  dispatch: any;
  menu: boolean;
  activeSpace: string;
}

export const Home: FC<HomeProps> = ({ dispatch, menu, activeSpace }) => (
  <App
    onContextMenu={(e: any) => {
      e.preventDefault();
      dispatch({
        type: 'TOGGLE_MENU',
        value: true,
        x: e.pageX,
        y: e.pageY,
        menuType: e.target.getAttribute('data-type'),
        id: e.target.getAttribute('data-id'),
      });
    }}
    onClick={(e: any) => {
      const target = e.target.getAttribute('data-type');
      if (target !== 'no-left-click') {
        dispatch({ type: 'CLOSE_MENU' });
      }
    }}
    onMouseMove={(e: any) => {
      dispatch({ type: 'MOUSE_POSITION', x: e.pageX, y: e.pageY });
    }}
  >
    <Loading />
    <Popup />
    <ThreeBox />
    <DndProvider backend={HTML5Backend}>
      <Container />
      <Menu />
    </DndProvider>
  </App>
);

export default connect((state: any) => ({
  menu: state.menu,
  activeSpace: state.activeSpace,
}))(Home);
