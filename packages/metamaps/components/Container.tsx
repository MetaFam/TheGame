import { FC } from 'react';
import { connect } from 'react-redux';
import { useDrop, XYCoord } from 'react-dnd';

import { MappingContainer } from '../styles/Mapping';

import { Square } from './Square';
import { Circle } from './Circle';
import { Line } from './Line';
import { Image } from './Image';

export interface ContainerProps {
  dispatch: any;
  items: Array<any>;
}

export const ContainerComponent: FC<ContainerProps> = ({ dispatch, items }) => {
  const [, drop] = useDrop({
    accept: ['SQUARE', 'CIRCLE', 'LINE', 'IMAGE'],
    drop(item: any, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);

      dispatch({ type: 'UPDATE_POSITION', object: item.type, index: item.id, left, top })
    }
  });

  return(
    <MappingContainer ref={drop}>
      {
        items.map((item, id) => {
          switch (item.type) {
            case 'SQUARE':
              return(
                <Square
                  key={id}
                  id={id}
                  type={item.type}
                  left={item.left}
                  top={item.top}
                  width={item.width}
                  height={item.height}
                  url={item.url}
                  popup={item.popup}/>
              )
            case 'CIRCLE':
              return(
                <Circle
                  key={id}
                  id={id}
                  type={item.type}
                  left={item.left}
                  top={item.top}
                  width={item.width}
                  height={item.height}
                  url={item.url}
                  popup={item.popup}/>
              )
            case 'LINE':
              return(
                <Line
                  key={id}
                  id={id}
                  type={item.type}
                  left={item.left}
                  top={item.top}
                  width={item.width}
                  height={item.height}
                  x1={item.x1}
                  y1={item.y1}
                  x2={item.x2}
                  y2={item.y2}/>
              )
            case 'IMAGE':
              return(
                <Image
                  key={id}
                  id={id}
                  type={item.type}
                  left={item.left}
                  top={item.top}
                  width={item.width}
                  height={item.height}
                  url={item.url}
                  popup={item.popup}/>
              )
            default: 
                return(
                  <div/>
                )
          }
        })
      }
    </MappingContainer>
  )
}

export const Container = connect(
  (state: any) => ({
    items: state.items,
  })
)(ContainerComponent);