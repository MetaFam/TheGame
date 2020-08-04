export interface State {
    loading: boolean;
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
    loading: true,
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
    items: [],
};