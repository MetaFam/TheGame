import update from 'immutability-helper';
import { Context, createWrapper, HYDRATE,MakeStore } from 'next-redux-wrapper';
import { AnyAction, applyMiddleware, compose,createStore } from 'redux';
import thunk from 'redux-thunk';

import { initialState, State } from './Reducer.state';

export function reducer(state: State = initialState, action: AnyAction): State {
    if (action.type !== 'MOUSE_POSITION' && action.type !== 'UPDATE_VECTOR') {
        console.log(state, action);
    }

    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        case 'NO_WEB3':
            return {
                ...state,
                hasWeb3: false,
            };
        case 'LOADING':
            return {
                ...state,
                loading: action.value,
            };
        case 'UPDATE_NAVIGATION_INPUT':
            return {
                ...state,
                navigationInput: action.value,
            };
        case 'LOADED_NAVIGATION':
            return update(
                state,
                {
                    navigationItems: { $set: action.data },
                },
            );
        case 'LOADED_3BOX_URL':
            return {
                ...state,
                items: action.data,
            };
        case 'UPDATE_3BOX_URL':
            return {
                ...state,
                activeSpace: action.value,
            };
        case 'UPDATE_ETH_ACCOUNTS':
            return {
                ...state,
                ethAccounts: action.accounts,
            };
        case 'MOUSE_POSITION':
            return {
                ...state,
                mouseX: action.x,
                mouseY: action.y,
            };
        case 'TOGGLE_MENU':
            return {
                ...state,
                menu: action.value,
                menuType: (action.menuType ? action.menuType : 'normal'),
                selectedItem: (action.id ? Number(action.id) : -1),
                menuX: (action.x ? action.x : -1),
                menuY: (action.y ? action.y : -1),
            };
        case 'UPDATE_URL_BUTTON':
            return {
                ...state,
                menuType: 'url',
                urlText: state.items[state.selectedItem].url,
            };
        case 'UPDATE_URL_TEXT':
            return {
                ...state,
                urlText: action.value,
            };
        case 'UPDATE_URL':
            return {
                ...state,
                menu: false,
                urlText: '',
                items: state.items.map((item, index) => {
                    if (state.selectedItem === index) {
                        return {
                            ...item,
                            url: state.urlText,
                        };
                    }
                    return item;
                }),
            };
        case 'UPDATE_POPUP_BUTTON':
            return {
                ...state,
                menuType: 'popup',
                popupText: state.items[state.selectedItem].popup,
            };
        case 'UPDATE_POPUP_TEXT':
            return {
                ...state,
                popupText: action.value,
            };
        case 'UPDATE_POPUP':
            return {
                ...state,
                menu: false,
                popupText: '',
                items: state.items.map((item, index) => {
                    if (state.selectedItem === index) {
                        return {
                            ...item,
                            popup: state.popupText,
                        };
                    }
                    return item;
                }),
            };
        case 'OPEN_POPUP':
            return {
                ...state,
                renderedPopupText: action.popup,
                popupActive: action.popup.length > 0,
            };
        case 'CLOSE_POPUP':
            return {
                ...state,
                popupActive: false,
            };
        case 'CLOSE_MENU':
            return {
                ...state,
                menu: false,
            };
        case 'CREATE_SQUARE':
            return {
                ...state,
                items: state.items.concat({
                    type: 'SQUARE',
                    left: state.menuX,
                    top: state.menuY,
                    width: 100,
                    height: 100,
                    url: '',
                    popup: '',
                }),
            };
        case 'CREATE_CIRCLE':
            return {
                ...state,
                items: state.items.concat({
                    type: 'CIRCLE',
                    left: state.menuX,
                    top: state.menuY,
                    width: 100,
                    height: 100,
                    url: '',
                    popup: '',
                }),
            };
        case 'CREATE_LINE':
            return {
                ...state,
                createLine: true,
                items: state.items.concat({
                    type: 'LINE',
                    left: state.menuX,
                    top: state.menuY,
                    width: 0,
                    height: 0,
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0,
                }),
            };                
        case 'CREATE_IMAGE':
            return {
                ...state,
                items: state.items.concat({
                    type: 'IMAGE',
                    left: state.menuX,
                    top: state.menuY,
                    width: null,
                    height: 100,
                }),
                selectedItem: state.items.length,
            };
        case 'DRAW_LINE':
            return {
                ...state,
                createLine: false,
                items: state.items.map((item, index) => {
                    if (action.index === index) {
                        return {
                            ...item,
                            left: action.rleft,
                            top: action.rtop,
                            width: action.rwidth,
                            height: action.rheight,
                            x1: action.x1,
                            x2: action.x2,
                            y1: action.y1,
                            y2: action.y2,
                        };
                    }
                    return item;
                })
            };
        case 'UPDATE_POSITION':
            return {
                ...state,
                items: state.items.map((item, index) => {
                    if (action.index === index) {
                        return {
                            ...item,
                            left: action.left,
                            top: action.top,
                        };
                    }
                    return item;
                })
            };
        case 'UPDATE_VECTOR':
            return {
                ...state,
                resizeVector: {
                    left: action.rleft,
                    top: action.rtop,
                    width: action.rwidth,
                    height: action.rheight,
                },
            };
        case 'RESIZE_ITEM':
            return {
                ...state,
                selectedItem: action.index,
                resizingItem: true,
            };
        case 'RESIZE_ITEM_UPDATE':
            if (state.resizingItem) {
                return {
                    ...state,
                    resizingItem: false,
                    items: state.items.map((item, index) => {
                        if (state.selectedItem === index) {
                            return {
                                ...item,
                                ...state.resizeVector,
                            };
                        }
                        return item;
                    })
                }
            }
            return { ...state };
        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter((item, index) => index !== action.index),
            };
        default:
            return state;
    }
}

export type RootState = ReturnType<typeof reducer>;

export const makeStore: MakeStore<State> = (context: Context) => createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export const wrapper = createWrapper<State>(makeStore, {debug: true});