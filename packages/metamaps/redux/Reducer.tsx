import thunk from 'redux-thunk';
import { createStore, AnyAction, applyMiddleware, compose } from 'redux';
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';

export interface State {
    ethAccounts: Array<string>;
    activeSpace: string;
    menu: boolean;
    menuType: string;
    selectedItem: number;
    resizingItem: boolean;
    resizeVector: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    createLine: boolean;
    urlText: string;
    popupText: string;
    renderedPopupText: string;
    popupActive: boolean;
    menuX: number;
    menuY: number;
    mouseX: number;
    mouseY: number;
    items: Array<any>;
};

export const initialState = {
    ethAccounts: [],
    activeSpace: 'metamap',
    menu: false,
    menuType: 'normal',
    selectedItem: -1,
    resizingItem: false,
    resizeVector: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    },
    createLine: false,
    urlText: '',
    popupText: '',
    renderedPopupText: '',
    popupActive: false,
    menuX: 0,
    menuY: 0,
    mouseX: 0,
    mouseY: 0,
    items: [
        {
            type: 'SQUARE',
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            url: '',
            popup: '',
        },
    ],
};

export function reducer(state: State = initialState, action: AnyAction) {
    if (action.type !== 'MOUSE_POSITION' && action.type !== 'UPDATE_VECTOR') {
        console.log(state, action);
    }

    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        case 'LOADED_3BOX_URL':
            state.items = action.data;
            return { ...state };
        case 'UPDATE_3BOX_URL':
            state.activeSpace = action.value;
            return { ...state };
        case 'UPDATE_ETH_ACCOUNTS':
            state.ethAccounts = action.accounts;
            return { ...state };
        case 'MOUSE_POSITION':
            state.mouseX = action.x;
            state.mouseY = action.y;
            return { ...state };
        case 'TOGGLE_MENU':
            state.menu = action.value;
            action.menuType ? state.menuType = action.menuType : state.menuType = 'normal';
            action.id ? state.selectedItem = Number(action.id) : state.selectedItem = -1;
            if (action.x) { state.menuX = action.x; }
            if (action.y) { state.menuY = action.y; }
            return { ...state };
        case 'UPDATE_URL_BUTTON':
            state.menuType = 'url';
            state.urlText = state.items[state.selectedItem].url;
            return { ...state };
        case 'UPDATE_URL_TEXT':
            state.urlText = action.value;
            return { ...state };
        case 'UPDATE_URL':
            state.items = state.items.map((item, index) => {
                if (state.selectedItem === index) {
                    item.url = state.urlText;
                }
                return item;
            });
            state.menu = false;
            state.urlText = '';
            return { ...state };
        case 'UPDATE_POPUP_BUTTON':
            state.menuType = 'popup';
            state.popupText = state.items[state.selectedItem].popup;
            return { ...state };
        case 'UPDATE_POPUP_TEXT':
            state.popupText = action.value;
            return { ...state };
        case 'UPDATE_POPUP':
            state.items = state.items.map((item, index) => {
                if (state.selectedItem === index) {
                    item.popup = state.popupText;
                }
                return item;
            });
            state.menu = false;
            state.popupText = '';
            return { ...state };
        case 'OPEN_POPUP':
            state.renderedPopupText = action.popup;
            state.popupActive = true;
            return { ...state };
        case 'CLOSE_POPUP':
            state.popupActive = false;
            return { ...state };
        case 'CLOSE_MENU':
            state.menu = false;
            return { ...state };
        case 'CREATE_SQUARE':
            state.items = state.items.concat({
                type: 'SQUARE',
                left: state.menuX,
                top: state.menuY,
                width: 100,
                height: 100,
                url: '',
                popup: '',
            });
            return { ...state };
        case 'CREATE_CIRCLE':
            state.items = state.items.concat({
                type: 'CIRCLE',
                left: state.menuX,
                top: state.menuY,
                width: 100,
                height: 100,
                url: '',
                popup: '',
            });
            return { ...state };
        case 'CREATE_LINE':
            state.createLine = true;
            state.items = state.items.concat({
                type: 'LINE',
                left: state.menuX,
                top: state.menuY,
                width: 0,
                height: 0,
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
            });
            return { ...state };
        case 'CREATE_IMAGE':
            state.items = state.items.concat({
                type: 'IMAGE',
                left: state.menuX,
                top: state.menuY,
                width: null,
                height: 100,
            });
            state.selectedItem = state.items.length - 1;
            return { ...state };
        case 'DRAW_LINE':
            state.createLine = false;
            state.items = state.items.map((item, index) => {
                if (action.index === index) {
                    item.left = action.rleft;
                    item.top = action.rtop;
                    item.width = action.rwidth;
                    item.height = action.rheight;
                    item.x1 = action.x1;
                    item.x2 = action.x2;
                    item.y1 = action.y1;
                    item.y2 = action.y2;
                }
                return item;
            })
            return { ...state };
        case 'UPDATE_POSITION':
            state.items = state.items.map((item, index) => {
                if (action.index === index) {
                    item.left = action.left;
                    item.top = action.top;
                }
                return item;
            })
            return { ...state };
        case 'UPDATE_VECTOR':
            state.resizeVector = {
                left: action.rleft,
                top: action.rtop,
                width: action.rwidth,
                height: action.rheight,
            };
            return { ...state };
        case 'RESIZE_ITEM':
            state.selectedItem = action.index;
            state.resizingItem = true;
            return { ...state };
        case 'RESIZE_ITEM_UPDATE':
            if (state.resizingItem) {
                state.resizingItem = false;
                state.items = state.items.map((item, index) => {
                    if (state.selectedItem === index) {
                        item.left = state.resizeVector.left;
                        item.top = state.resizeVector.top;
                        item.width = state.resizeVector.width;
                        item.height = state.resizeVector.height;
                    }
                    return item;
                })
            }
            return { ...state };
        case 'DELETE_ITEM':
            state.items = state.items.filter((item, index) => index !== action.index);
            return { ...state };
    }

    return state;
}

export type RootState = ReturnType<typeof reducer>;

export const makeStore: MakeStore<State> = (context: Context) => createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export const wrapper = createWrapper<State>(makeStore, {debug: true});