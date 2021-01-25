import { Button, ButtonGroup, Input } from '@chakra-ui/react';
import React, { FC } from 'react';
import { CirclePicker } from 'react-color';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../redux/Reducer.state';
import { MapEditContainer } from './styles/Map.edit.styles';

export interface MapEditProps {
  dispatch: Dispatch;
  active: boolean;
  type: string;
  edit: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  url: string;
}

export const MapEditComponent: FC<MapEditProps> = ({
  dispatch,
  type,
  edit,
  active,
  x,
  y,
  width,
  height,
  content,
  url,
}) => {
  return (
    <MapEditContainer
      style={{
        opacity: edit ? 1 : 0,
        pointerEvents: edit ? 'inherit' : 'none',
        left: x,
        top: y,
      }}
    >
      {(() => {
        switch (edit) {
        case 'color':
          return (
            <CirclePicker
              onChangeComplete={(color) =>
                dispatch({ type: 'UPDATE_COLOR', color: color.hex })
              }
            />
          )
        case 'resize':
          return (
            <div className="resize preserve-context">
              <div className="input preserve-context">
                <p>Width (px)</p>
                <Input
                  placeholder="Width (px)"
                  size="md"
                  className="preserve-context"
                  value={width}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_RESIZE',
                      key: 'width',
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input preserve-context">
                <p>Height (px)</p>
                <Input
                  placeholder="Height (px)"
                  size="md"
                  className="preserve-context"
                  value={height}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_RESIZE',
                      key: 'height',
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <ButtonGroup
                variant="outline"
                size="sm"
                display="flex"
                justifyContent="flex-end"
              >
                <Button
                  colorScheme="purple"
                  onClick={(e) => dispatch({ type: 'EDIT', value: false })}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="purple"
                  onClick={(e) => dispatch({ type: 'UPDATE_SIZE', width, height })}
                >
                  Update
                </Button>
              </ButtonGroup>
            </div>
          )
        case 'text':
          return (
            <div className="text preserve-context">
              <div className="input preserve-context">
                <p>Content</p>
                <Input
                  placeholder="Text goes here"
                  size="md"
                  className="preserve-context"
                  value={content}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_TEXT', value: e.target.value })
                  }
                />
              </div>
              <ButtonGroup
                variant="outline"
                size="sm"
                display="flex"
                justifyContent="flex-end"
              >
                <Button
                  colorScheme="purple"
                  onClick={(e) => dispatch({ type: 'EDIT', value: false })}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="purple"
                  onClick={(e) => dispatch({ type: 'CHANGE_TEXT', content })}
                >
                  Update
                </Button>
              </ButtonGroup>
            </div>
          )
        case 'url':
          return (
            <div className="text preserve-context">
              <div className="input preserve-context">
                <p>URL</p>
                <Input
                  placeholder="URL goes here"
                  size="md"
                  className="preserve-context"
                  value={url}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_URL', value: e.target.value })
                  }
                />
              </div>
              <ButtonGroup
                variant="outline"
                size="sm"
                display="flex"
                justifyContent="flex-end"
              >
                <Button
                  colorScheme="purple"
                  onClick={(e) => dispatch({ type: 'EDIT', value: false })}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="purple"
                  onClick={(e) => dispatch({ type: 'CHANGE_URL', url })}
                >
                  Update
                </Button>
              </ButtonGroup>
            </div>
          )
        }
      })()}
    </MapEditContainer>
  );
};

export const MapEdit = connect((state: State) => ({
  active: state.map.context.active,
  type: state.map.context.type,
  edit: state.map.context.edit,
  active: state.map.context.active,
  x: state.map.context.x,
  y: state.map.context.y,
  width: state.map.context.resize.width,
  height: state.map.context.resize.height,
  content: state.map.context.text.content,
  url: state.map.context.text.url,
}))(MapEditComponent);
