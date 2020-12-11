import update from 'immutability-helper';
import React from 'react';
import { AnyAction } from 'redux';

import { State } from './Reducer.state'; // eslint-disable-line

export interface MapState {
  map: {
    loading: boolean;
    counter: number;
    activeIndex: number;

    profiles: {
      data: Array<any>;
      x: number;
      y: number;
    };

    id: string;
    name: string;
    owner: string;

    background: {
      type: string;
      url: string;
    };

    data: Array<any>;

    popover: {
      toggle: boolean;
      background: boolean;
      assignment: boolean;
      name: boolean;
      nameInput: string;
      assignmentInput: string;
      saving: boolean;

      assignmentProfiles: Array<any>;
    };

    context: {
      type: string;
      edit: string;
      active: boolean;
      x: number;
      y: number;

      resize: {
        width: number;
        height: number;
      };

      text: {
        content: string;
        url: string;
      };
    };
  };
}

export const InitialMapState: MapState = {
  map: {
    loading: false,
    counter: 0,
    activeIndex: -1,

    profiles: {
      data: [],
      x: 0,
      y: 0,
    },

    id: '',
    name: '',
    owner: '',

    background: {
      type: '',
      url: '',
    },

    data: [],

    popover: {
      toggle: false,
      background: false,
      name: false,
      assignment: false,
      nameInput: '',
      assignmentInput: '',
      saving: false,
      assignmentProfiles: [],
    },

    context: {
      type: 'normal',
      edit: '',
      active: false,
      x: -1,
      y: -1,

      resize: {
        width: 0,
        height: 0,
      },

      text: {
        content: '',
        url: '',
      },
    },
  },
};

export function MapActions(state: State, action: AnyAction): State {
  switch (action.type) {
    case 'MAP_LOADING':
      return update(state, { map: { loading: { $set: action.value } } });
    case 'MAP_DATA':
      return update(state, {
        map: {
          id: { $set: action.id },
          name: { $set: action.name },
          owner: { $set: action.owner },
          counter: { $set: action.data?.counter ?? 0 },
          background: {
            $set: action.data?.background ?? { type: 'color', url: 'default' },
          },
          data: { $set: action.data?.elements ?? [] },
        },
      });
    case 'SAVE_NAME_INPUT':
      return update(state, {
        map: {
          name: { $set: action.value },
          popover: {
            name: { $set: false },
            nameInput: { $set: '' },
          },
        },
      });
    case 'POPULATE_PROFILES':
      return update(state, {
        map: {
          profiles: {
            data: { $set: action.value },
            x: { $set: action.x },
            y: { $set: action.y },
          },
        },
      });
    case 'UPDATE_BACKGROUND':
      return update(state, {
        map: {
          background: {
            type: { $set: action.bgType },
            url: { $set: action.url },
          },
          popover: {
            background: { $set: false },
          },
        },
      });
    case 'ACTIVATE_CONTEXT':
      return update(state, {
        map: {
          context: {
            active: { $set: action.active },
            x: { $set: action.x ?? state.map.context.x },
            y: { $set: action.y ?? state.map.context.y },
          },
        },
      });
    case 'CONTEXT_TYPE':
      return update(state, {
        map: {
          activeIndex: { $set: action.activeIndex },
          context: {
            type: { $set: action.menu },
          },
        },
      });
    case 'EDIT':
      return update(state, {
        map: {
          context: {
            edit: { $set: action.key },
            active: { $set: false },
            resize: {
              width: { $set: action.width ?? state.map.context.resize.width },
              height: {
                $set: action.height ?? state.map.context.resize.height,
              },
            },
            text: {
              content: { $set: action.text },
              url: { $set: action.url },
            },
          },
        },
      });
    case 'UPDATE_RESIZE':
      return update(state, {
        map: {
          context: {
            resize: {
              [action.key]: { $set: action.value },
            },
          },
        },
      });
    case 'UPDATE_TEXT':
      return update(state, {
        map: {
          context: {
            text: {
              content: { $set: action.value },
            },
          },
        },
      });
    case 'UPDATE_URL':
      return update(state, {
        map: {
          context: {
            text: {
              url: { $set: action.value },
            },
          },
        },
      });
    case 'REMOVE_ASSIGNMENT':
      return update(state, {
        map: {
          popover: {
            assignmentProfiles: {
              $set: state.map.popover.assignmentProfiles.filter(
                (profile) => profile.proof_did !== action.key,
              ),
            },
          },
        },
      });
    case 'ADD_ASSIGNMENT':
      return update(state, {
        map: {
          popover: {
            assignmentProfiles: {
              $push: [action.value],
            },
          },
        },
      });
    case 'SAVE_ASSIGNMENT':
      return update(state, {
        map: {
          data: {
            $set: state.map.data.filter((item) => {
              if (item.id.toString() === state.map.activeIndex.toString()) {
                return {
                  ...item,
                  data: {
                    ...item.data,
                    users: action.value,
                  },
                };
              }
              return item;
            }),
          },
          popover: {
            assignment: { $set: false },
          },
        },
      });
    case 'POPOVER_TOGGLE':
      return update(state, {
        map: { popover: { toggle: { $set: !state.map.popover.toggle } } },
      });
    case 'POPOVER_BACKGROUND':
      return update(state, {
        map: { popover: { background: { $set: action.value } } },
      });
    case 'POPOVER_ASSIGNMENT':
      return update(state, {
        map: {
          popover: {
            assignment: { $set: action.value },
            assignmentProfiles: {
              $set:
                state.map.data.filter(
                  (item) =>
                    item.id.toString() === state.map.activeIndex.toString(),
                )[0].data.users ?? [],
            },
          },
        },
      });
    case 'POPOVER_NAME':
      return update(state, {
        map: { popover: { name: { $set: action.value } } },
      });
    case 'POPOVER_NAME_INPUT':
      return update(state, {
        map: { popover: { nameInput: { $set: action.value } } },
      });
    case 'POPOVER_ASSIGNMENT_INPUT':
      return update(state, {
        map: { popover: { assignmentInput: { $set: action.value } } },
      });
    case 'SAVING_MAP':
      return update(state, {
        map: { popover: { saving: { $set: action.value } } },
      });
    case 'CREATE_SQUARE':
      return update(state, {
        map: {
          counter: { $set: state.map.counter + 1 },
          data: {
            $push: [
              {
                id: state.map.counter + 1,
                className: `map-context-${
                  state.map.counter + 1
                } map-context-square`,
                animated: true,
                type: 'default',
                style: { background: '#FFF', width: 100, height: 100 },
                position: { x: state.map.context.x, y: state.map.context.y },
                data: { label: '' },
              },
            ],
          },
        },
      });
    case 'CREATE_CIRCLE':
      return update(state, {
        map: {
          counter: { $set: state.map.counter + 1 },
          data: {
            $push: [
              {
                id: state.map.counter + 1,
                className: `map-context-${
                  state.map.counter + 1
                } map-context-circle`,
                animated: true,
                type: 'default',
                style: {
                  background: '#FFF',
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                },
                position: { x: state.map.context.x, y: state.map.context.y },
                data: { label: '' },
              },
            ],
          },
        },
      });
    case 'CREATE_TRIANGLE':
      return update(state, {
        map: {
          counter: { $set: state.map.counter + 1 },
          data: {
            $push: [
              {
                id: state.map.counter + 1,
                className: `map-context-${
                  state.map.counter + 1
                } map-context-triangle`,
                animated: true,
                type: 'default',
                style: {
                  width: 100,
                  height: 100,
                  background: `conic-gradient(at 50% 50%,transparent 135deg,#FFF 0,#FFF 225deg, transparent 0)`,
                },
                position: { x: state.map.context.x, y: state.map.context.y },
                data: { label: '' },
              },
            ],
          },
        },
      });
    case 'CREATE_TEXT':
      return update(state, {
        map: {
          counter: { $set: state.map.counter + 1 },
          data: {
            $push: [
              {
                id: state.map.counter + 1,
                className: `map-context-${
                  state.map.counter + 1
                } map-context-text`,
                animated: true,
                type: 'default',
                style: {
                  width: 300,
                  height: 100,
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  fontSize: 18,
                },
                position: { x: state.map.context.x, y: state.map.context.y },
                data: { label: 'Right click to change text' },
              },
            ],
          },
        },
      });
    case 'CREATE_IMAGE':
      return update(state, {
        map: {
          counter: { $set: state.map.counter + 1 },
          data: {
            $push: [
              {
                id: state.map.counter + 1,
                className: `map-context-${
                  state.map.counter + 1
                } map-context-image`,
                animated: true,
                type: 'default',
                style: {
                  width: 100,
                  height: 100,
                  userSelect: 'none',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  fontSize: 18,
                },
                position: { x: state.map.context.x, y: state.map.context.y },
                data: {
                  label: (
                    <img
                      src={action.value}
                      alt="metamap-content"
                      className="map-context-image"
                    />
                  ),
                  type: 'image',
                  base64: action.value,
                },
              },
            ],
          },
        },
      });
    case 'CREATE_VIDEO':
      return update(state, {
        map: {
          counter: { $set: state.map.counter + 1 },
          data: {
            $push: [
              {
                id: state.map.counter + 1,
                className: `map-context-${
                  state.map.counter + 1
                } map-context-video`,
                animated: true,
                type: 'default',
                style: {
                  width: 100,
                  height: 100,
                  userSelect: 'none',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  fontSize: 18,
                },
                position: { x: state.map.context.x, y: state.map.context.y },
                data: {
                  label: (
                    <video controls className="map-context-video">
                      <source src={action.value} />
                    </video>
                  ),
                  type: 'video',
                  base64: action.value,
                }, // eslint-disable-line
              },
            ],
          },
        },
      });
    case 'CONNECT_NODES':
      return update(state, {
        map: {
          data: {
            $push: [
              {
                id: `s${action.data.source}-t${action.data.target}`,
                ...action.data,
                animated: true,
              },
            ],
          },
        },
      });
    case 'UPDATE_POSITION':
      return update(state, {
        map: {
          data: {
            $set: state.map.data.map((item) => {
              if (item.id.toString() === action.item.id.toString()) {
                return {
                  ...item,
                  position: {
                    ...item.position,
                    x: action.item.position.x,
                    y: action.item.position.y,
                  },
                };
              }
              return item;
            }),
          },
        },
      });
    case 'UPDATE_COLOR':
      return update(state, {
        map: {
          data: {
            $set: state.map.data.map((item) => {
              if (item.id.toString() === state.map.activeIndex.toString()) {
                if (item.className.indexOf('map-context-text') !== -1) {
                  return {
                    ...item,
                    style: {
                      ...item.style,
                      color: action.color,
                    },
                  };
                }
                if (item.className.indexOf('map-context-triangle') !== -1) {
                  return {
                    ...item,
                    style: {
                      ...item.style,
                      background: `conic-gradient(at 50% 50%,transparent 135deg,${action.color} 0,${action.color} 225deg, transparent 0)`,
                    },
                  };
                }
                return {
                  ...item,
                  style: {
                    ...item.style,
                    background: action.color,
                  },
                };
              }
              return item;
            }),
          },
        },
      });
    case 'UPDATE_SIZE':
      return update(state, {
        map: {
          data: {
            $set: state.map.data.map((item) => {
              if (item.id.toString() === state.map.activeIndex.toString()) {
                return {
                  ...item,
                  style: {
                    ...item.style,
                    width: `${action.width}px` ?? item.style.width,
                    height: `${action.height}px` ?? item.style.height,
                  },
                };
              }
              return item;
            }),
          },
        },
      });
    case 'CHANGE_TEXT':
      return update(state, {
        map: {
          data: {
            $set: state.map.data.map((item) => {
              if (item.id.toString() === state.map.activeIndex.toString()) {
                return {
                  ...item,
                  data: {
                    ...item.data,
                    label: action.content,
                  },
                };
              }
              return item;
            }),
          },
        },
      });
    case 'CHANGE_URL':
      return update(state, {
        map: {
          data: {
            $set: state.map.data.map((item) => {
              if (item.id.toString() === state.map.activeIndex.toString()) {
                return {
                  ...item,
                  data: {
                    ...item.data,
                    url: action.url,
                  },
                };
              }
              return item;
            }),
          },
        },
      });
    case 'ASSIGN_SELF':
      return update(state, {
        map: {
          data: {
            $set: state.map.data.map((item) => {
              if (item.id.toString() === state.map.activeIndex.toString()) {
                if (state.accounts.length > 0) {
                  const users = item.data.users ? item.data.users : [];
                  users.push(action.value);
                  return {
                    ...item,
                    data: {
                      ...item.data,
                      users,
                    },
                  };
                }
              }
              return item;
            }),
          },
        },
      });
    case 'REMOVE_ITEM':
      return update(state, {
        map: {
          data: {
            $set: state.map.data.filter((item) => {
              if (
                item.id === state.map.activeIndex ||
                Number(item.source) === state.map.activeIndex ||
                Number(item.target) === state.map.activeIndex
              ) {
                return false;
              }
              return true;
            }),
          },
        },
      });
    default:
      return state;
  }
}
