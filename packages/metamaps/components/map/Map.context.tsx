import Box from '3box';
import React, { FC } from 'react';
import {
  AiFillDelete,
  AiFillFileImage,
  AiOutlineFontSize,
  AiOutlineLink,
  AiOutlineUserAdd,
  AiOutlineVideoCameraAdd,
} from 'react-icons/ai';
import { BiPalette, BiShapeTriangle } from 'react-icons/bi';
import { FaHashtag, FaRegAddressCard, FaRegCircle } from 'react-icons/fa';
import { FiTriangle } from 'react-icons/fi';
import { IoMdResize, IoMdSquareOutline } from 'react-icons/io';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../redux/Reducer.state';
import { MapContextContainer } from './styles/Map.context.styles';

export interface MapContextProps {
  dispatch: Dispatch;
  accounts: Array<string>;
  active: boolean;
  type: string;
  x: number;
  y: number;
}

export const MapContextComponent: FC<MapContextProps> = ({
  dispatch,
  accounts,
  active,
  type,
  x,
  y,
}) => {
  return (
    <MapContextContainer
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'inherit' : 'none',
        left: x,
        top: y,
      }}
    >
      {type === 'normal' ? (
        <>
          <button
            type="button"
            className="item"
            onClick={(e) => dispatch({ type: 'CREATE_TEXT' })}
          >
            Text
            <AiOutlineFontSize />
          </button>
          <button type="button" className="item">
            Shapes
            <BiShapeTriangle />
            <div className="sub-context">
              <button
                type="button"
                className="item"
                onClick={(e) => dispatch({ type: 'CREATE_SQUARE' })}
              >
                Square
                <IoMdSquareOutline />
              </button>
              <button
                type="button"
                className="item"
                onClick={(e) => dispatch({ type: 'CREATE_CIRCLE' })}
              >
                Circle
                <FaRegCircle />
              </button>
              <button
                type="button"
                className="item"
                onClick={(e) => dispatch({ type: 'CREATE_TRIANGLE' })}
              >
                Triangle
                <FiTriangle />
              </button>
            </div>
          </button>

          <input
            style={{ display: 'none' }}
            id="image-input"
            type="file"
            accept="image/*"
            onChange={(e: any) => {
              const el: any = document.querySelector('input#image-input');
              const file = el.files[0];
              const reader = new FileReader();
              reader.onload = (e2: any) => {
                dispatch({ type: 'CREATE_IMAGE', value: e2.target.result });
              };
              reader.readAsDataURL(file);
            }}
          />

          <button
            type="button"
            className="item"
            onClick={(e) => {
              const el: any = document.querySelector('input#image-input');
              el.click();
            }}
          >
            Image
            <AiFillFileImage />
          </button>

          <input
            style={{ display: 'none' }}
            id="video-input"
            type="file"
            accept="video/*"
            onChange={(e: any) => {
              const el: any = document.querySelector('input#video-input');
              const file = el.files[0];
              const reader = new FileReader();
              reader.onload = (e2: any) => {
                dispatch({ type: 'CREATE_VIDEO', value: e2.target.result });
              };
              reader.readAsDataURL(file);
            }}
          />

          <button
            type="button"
            className="item"
            onClick={(e) => {
              const el: any = document.querySelector('input#video-input');
              el.click();
            }}
          >
            Video
            <AiOutlineVideoCameraAdd />
          </button>
        </>
      ) : (
        ''
      )}

      {type === 'object' || type === 'text' ? (
        <>
          {type === 'text' ? (
            <button
              type="button"
              className="item"
              onClick={(e) => dispatch({ type: 'EDIT', key: 'text' })}
            >
              Edit Text
              <AiOutlineFontSize />
            </button>
          ) : (
            ''
          )}

          <button type="button" className="item">
            Assign
            <FaRegAddressCard />
            <div className="sub-context">
              <button
                type="button"
                className="item"
                onClick={async (e) => {
                  if (accounts.length > 0) {
                    const value = await Box.getProfile(accounts[0]);
                    dispatch({ type: 'ASSIGN_SELF', value });
                  }
                }}
              >
                To self
                <AiOutlineUserAdd />
              </button>
              <button
                type="button"
                className="item"
                onClick={(e) =>
                  dispatch({ type: 'POPOVER_ASSIGNMENT', value: true })
                }
              >
                Manage
                <FaHashtag />
              </button>
            </div>
          </button>
          <button
            type="button"
            className="item"
            onClick={(e) => dispatch({ type: 'EDIT', key: 'url' })}
          >
            URL
            <AiOutlineLink />
          </button>
          <button
            type="button"
            className="item"
            onClick={(e) => dispatch({ type: 'EDIT', key: 'resize' })}
          >
            Resize
            <IoMdResize />
          </button>
          <button
            type="button"
            className="item"
            onClick={(e) => dispatch({ type: 'EDIT', key: 'color' })}
          >
            Color
            <BiPalette />
          </button>
          <button
            type="button"
            className="item"
            onClick={(e) => dispatch({ type: 'REMOVE_ITEM' })}
          >
            Delete
            <AiFillDelete />
          </button>
        </>
      ) : (
        ''
      )}
    </MapContextContainer>
  );
};

export const MapContext = connect((state: State) => ({
  accounts: state.accounts,
  active: state.map.context.active,
  type: state.map.context.type,
  x: state.map.context.x,
  y: state.map.context.y,
}))(MapContextComponent);
