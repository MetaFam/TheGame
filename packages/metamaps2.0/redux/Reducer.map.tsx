import update from 'immutability-helper';
import { AnyAction } from 'redux';

import { SquareColor, CircleColor } from '../theme/Theme.colors';

import { State } from './Reducer';

export interface MapState {
    map: {
        loading: boolean;
        error: boolean;
        errorMessage: string;
        
        context: {
            x: number;
            y: number;
            active: boolean;
            type: string;
        };

        activeItem: {
            width: number;
            height: number;
        };

        itemUrlInput: string;
        itemTextInput: string;

        resize: boolean;
        url: boolean;
        text: boolean;

        itemIndex: number;
        counter: number;
        data: Array<any>;
    };
}

export const MapInitialState: MapState = {
    map: {
        loading: false,
        error: false,
        errorMessage: '',

        context: {
            x: 0,
            y: 0,
            active: false,
            type: 'normal',
        },

        activeItem: {
            width: 0,
            height: 0,
        },

        itemUrlInput: '',
        itemTextInput: '',

        resize: false,
        url: false,
        text: false,

        itemIndex: -1,
        counter: 0,
        data: [],
    },
}

export function MapActions(State: State, Action: AnyAction): State {
    switch (Action.type) {
        case 'LOADING':
            return update(
                State,
                {
                    map: { loading: { $set: Action.value } },
                }
            );
        case 'LOADED_3BOX_URL':
            return update(
                State,
                {
                    map: {
                        data: { $set: Action.data },
                        counter: { $set: Action.counter },
                    }
                }
            );
        case 'ACTIVATE_CONTEXT':
            const ActiveItem = (Action.itemIndex > -1 && State.map.data.filter(item => item.id === Action.itemIndex).length > 0) ? 
                State.map.data.filter(item => item.id === Action.itemIndex)[0]['style']
                :
                State.map.activeItem;

            return update(
                State,
                {
                    map: {
                        itemIndex: { $set: Action.itemIndex ? Action.itemIndex : State.map.itemIndex },
                        activeItem: { $set: ActiveItem },

                        context: {
                            x: { $set: Action.x ? Action.x : State.map.context.x },
                            y: { $set: Action.y ? Action.y : State.map.context.y },
                            active: { $set: Action.active },
                            type: { $set: Action.menuType ? Action.menuType : 'normal' },
                        }
                    }
                }
            );
        case 'MAP_CONNECT_NODES':
            const Connection = {
                id: `s${Action.data.source}-t${Action.data.target}`,
                ...Action.data,
                animated: true,
            };

            return update(
                State,
                { map: { data: { $push: [Connection] } } },
            );
        case 'ITEM_AUX_CONTEXT':
            return update(
                State,
                { map: { 
                    [Action.key]: { $set: Action.value },
                    context: { active: { $set: false } },
                } },
            );
        case 'UPDATE_ITEM_URL':
            return update(
                State,
                { map: {
                    itemUrlInput: { $set: Action.value },
                } },
            );
        case 'UPDATE_ITEM_TEXT':
            return update(
                State,
                { map: {
                    itemTextInput: { $set: Action.value },
                } },
            );
        case 'UPDATE_URL':
            return update(
                State,
                { map: {
                    data: {
                        $set: State.map.data.map(item => {
                            if (item.id === Action.itemIndex) {
                                item['data']['url'] = Action.itemUrlInput;
                            }
                            return item;
                        })
                    },
                    url: { $set: false },
                    context: { active: { $set: false } },
                } },
            );
        case 'UPDATE_TEXT':
            return update(
                State,
                { map: {
                    data: {
                        $set: State.map.data.map(item => {
                            if (item.id === Action.itemIndex) {
                                item['data']['label'] = Action.itemTextInput;
                                item['position']['x'] = item['position']['x'] + 1;
                                item['position']['y'] = item['position']['y'] + 1;
                            }
                            return item;
                        })
                    },
                    text: { $set: false },
                    context: { active: { $set: false } },
                } },
            );
        case 'UPDATE_SIZE':
            return update(
                State,
                { map: {
                    data: {
                        $set: State.map.data.map(item => {
                            if (item.id === Action.itemIndex) {
                                item['position']['x'] = item['position']['x'] + 1;
                                item['position']['y'] = item['position']['y'] + 1;
                                item['style']['width'] = Number(Action.width);
                                item['style']['height'] = Number(Action.height);
                            }

                            return item;
                        })
                    },
                    resize: { $set: false },
                    context: { active: { $set: false } },
                } }
            )
        case 'UPDATE_POSITION':
            return update(
                State,
                { map: {
                    data: {
                        $set: State.map.data.map(item => {
                            if (item.id.toString() === Action.item.id.toString()) {
                                item['position']['x'] = Action.item.position.x;
                                item['position']['y'] = Action.item.position.y;
                            }

                            return item;
                        })
                    },
                    resize: { $set: false },
                    context: { active: { $set: false } },
                } }
            )
        case 'UPDATE_ITEM_KEY':
            return update(
                State,
                { map: {
                    activeItem: { 
                        [Action.key]: { $set: Action.value }
                    }
                } },
            );
        case 'REMOVE_ITEM':
            return update(
                State,
                {
                    map: {
                        data: { 
                            $set: State.map.data.filter(item => {
                                if (item.id === State.map.itemIndex || Number(item.source) === State.map.itemIndex || Number(item.target) === State.map.itemIndex) {
                                    return false;
                                } else {
                                    return true;
                                }
                            })
                        },
                        context: { active: { $set: false } },
                    },
                },
            );
        case 'MAP_UPDATE_NODE':
            return update(
                State,
                {
                    map: {
                        data: {
                            $set: State.map.data.map(item => {
                                if (item.id === Action.id) {
                                    item.position.x = Action.x;
                                    item.position.y = Action.y;
                                }
                                return item;
                            })
                        }
                    }
                },
            )
        case 'MAP_ADD_SQUARE':
            const Square = {
                id: State.map.counter + 1,
                className: `map-context-${State.map.counter + 1}`,
                animated: true,
                type: 'default',
                style: { background: SquareColor, width: 100, height: 100 },
                position: { x: State.map.context.x, y: State.map.context.y },
                data: { label: '' },
            };

            return update(
                State,
                { map: { 
                    counter: { $set: State.map.counter + 1 },
                    data: { $push: [Square] },
                    context: { active: { $set: false } },
                } },
            );
        case 'MAP_ADD_CIRCLE':
            const Circle = {
                id: State.map.counter + 1,
                className: `map-context-${State.map.counter + 1}`,
                animated: true,
                type: 'default',
                style: { background: CircleColor, width: 100, height: 100, borderRadius: '50%' },
                position: { x: State.map.context.x, y: State.map.context.y },
                data: { label: '' },
            };

            return update(
                State,
                { map: {
                    counter: { $set: State.map.counter + 1 },
                    data: { $push: [Circle] },
                    context: { active: { $set: false } },
                } },
            );
        case 'MAP_ADD_IMAGE':
            const Image = {
                id: State.map.counter + 1,
                className: `map-context-${State.map.counter + 1}`,
                animated: true,
                type: 'default',
                style: {
                    backgroundColor: 'transparent',
                    backgroundImage: `url("${Action.value}")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    width: 200,
                    height: 200,
                },
                position: { x: State.map.context.x, y: State.map.context.y },
                data: { label: '' },
            };

            return update(
                State,
                { map: {
                    counter: { $set: State.map.counter + 1 },
                    data: { $push: [Image] },
                    context: { active: { $set: false } },
                    itemIndex: { $set: State.map.counter + 1 },
                } },
            );
        case 'MAP_ADD_TEXT':
            const Text = {
                id: State.map.counter + 1,
                className: `map-context-${State.map.counter + 1} context-with-text`,
                animated: true,
                type: 'default',
                style: { background: 'transparent', width: 400, height: 50, color: 'white', border: 'none' },
                position: { x: State.map.context.x, y: State.map.context.y },
                data: { label: 'Right Click To Add Text' },
            };

            return update(
                State,
                { map: {
                    counter: { $set: State.map.counter + 1 },
                    data: { $push: [Text] },
                    context: { active: { $set: false } },
                } },
            );
        default:
            return State
    }
}