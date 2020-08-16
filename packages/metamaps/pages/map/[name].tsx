import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';

import { Load3BoxUrl } from '../../redux/ThreeBox';

import { Loading } from '../../components/shared/Loading';
import { Container } from '../../components/app/Container';
import { ContextMenu } from '../../components/app/ContextMenu';
import { Popup } from '../../components/app/Popup';
import { Menu } from '../../components/app/Menu';

import { App } from '../../styles/App';

declare const window: any;

export interface AppProps {
  dispatch: any;
  menu: boolean;
  activeSpace: string;
  ethAccounts: Array<string>;
}

export const AppComponent: FC<AppProps> = ({ dispatch, ethAccounts, menu, activeSpace }) => {
  const { query }: any = useRouter();

  useEffect(() => {
    dispatch({ type: 'UPDATE_3BOX_URL', value: query.name });
    (async () => dispatch(await Load3BoxUrl(ethAccounts[0], query.name)))();
  }, []);

  return(
    <App
      onContextMenu={(e: any) => {
          e.preventDefault();
          dispatch({
            type: 'TOGGLE_MENU',
            value: true,
            x: e.pageX,
            y: e.pageY,
            menuType: e.target.getAttribute('data-type'),
            id: e.target.getAttribute('data-id')
          })
        }
      }
      onClick={(e: any) => {
          const target = e.target.getAttribute('data-type');
          if (target !== 'no-left-click') {
            dispatch({ type: 'CLOSE_MENU' })
          }
        }
      }
      onMouseMove={(e: any) => {
        dispatch({ type: 'MOUSE_POSITION', x: e.pageX, y: e.pageY });
      }}
    >
    <Loading/>
    <Popup/>
    <Menu/>
    <DndProvider backend={HTML5Backend}>
      <Container/>
      <ContextMenu/>
    </DndProvider>
  </App>
  )
}

export default connect(
  (state: any) => ({
    menu: state.menu,
    activeSpace: state.activeSpace,
    ethAccounts: state.ethAccounts,
  })
)(AppComponent);
