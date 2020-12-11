import { Button, ButtonGroup, Input, useToast } from '@chakra-ui/react';
import Box from '3box';
import React, { FC, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useMutation } from 'urql';

import { UpdateMapName } from '../../graphql/updateMap';
import { State } from '../../redux/Reducer.state';
import { MapPopoverContainer } from './styles/Map.popover.styles';

export interface MapPopoverProps {
  dispatch: Dispatch;
  id: string;
  background: boolean;
  name: boolean;
  assignment: boolean;
  nameInput: string;
  assignmentInput: string;
  assignmentProfiles: Array<any>;
}

export const MapPopoverComponent: FC<MapPopoverProps> = ({
  dispatch,
  id,
  background,
  name,
  assignment,
  nameInput,
  assignmentInput,
  assignmentProfiles,
}) => {
  const toast = useToast();

  const [state, executeMutation] = useMutation(UpdateMapName);

  useEffect(() => {
    dispatch({ type: 'UPDATE_NAME_FETCHING', value: state.fetching });
    dispatch({ type: 'UPDATE_NAME_ERROR', value: state.error });
    console.log(state);
  }, [dispatch, state]);

  async function updateMapName() {
    await executeMutation({ id, name });
  }

  return (
    <MapPopoverContainer
      className={background || name || assignment ? 'active' : ''}
    >
      <div className="popover-wrap">
        <div className={`popover ${background ? 'active' : ''}`}>
          <h2>Change Background</h2>
          <div className="options">
            <button
              type="button"
              className="option"
              onClick={(e) =>
                dispatch({
                  type: 'UPDATE_BACKGROUND',
                  bgType: 'color',
                  url: 'default',
                })
              }
            >
              <div className="option-bg" />
              <p>Default</p>
            </button>
            <button
              type="button"
              className="option"
              onClick={(e) =>
                dispatch({
                  type: 'UPDATE_BACKGROUND',
                  bgType: 'video',
                  url: '/video/space.mp4',
                })
              }
            >
              <div className="option-bg">
                <video autoPlay muted loop className="video">
                  <source src="/video/space.mp4" />
                </video>
              </div>
              <p>Space</p>
            </button>
          </div>
          <div className="button-wrap">
            <Button
              size="lg"
              variant="outline"
              colorScheme="purple"
              margin="15px 0"
              width="180px"
              onClick={(e) =>
                dispatch({ type: 'POPOVER_BACKGROUND', value: false })
              }
            >
              Close
            </Button>
          </div>
        </div>
      </div>

      <div className="popover-wrap">
        <div className={`popover ${name ? 'active' : ''}`}>
          <h2>Change Name</h2>
          <Input
            size="lg"
            variant="flushed"
            colorScheme="purple"
            placeholder="New map name"
            textAlign="center"
            margin="30px 15px"
            width="calc(100% - 30px)"
            value={nameInput}
            onChange={(e) =>
              dispatch({ type: 'POPOVER_NAME_INPUT', value: e.target.value })
            }
          />

          <ButtonGroup
            variant="outline"
            size="lg"
            display="flex"
            justifyContent="center"
          >
            <Button
              colorScheme="purple"
              onClick={(e) => dispatch({ type: 'POPOVER_NAME', value: false })}
            >
              Cancel
            </Button>
            <Button
              colorScheme="purple"
              onClick={async (e) => {
                await updateMapName();
                dispatch({ type: 'SAVE_NAME_INPUT', value: nameInput });
              }}
            >
              Update
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="popover-wrap">
        <div className={`popover ${assignment ? 'active' : ''}`}>
          <h2>Assign Users</h2>
          <div className="profiles">
            {assignmentProfiles.map((profile) => {
              return (
                <div className="profile" key={profile.proof_did}>
                  <p>
                    {profile.emoji} {profile.name}
                  </p>
                  <AiFillDelete
                    onClick={(e) =>
                      dispatch({
                        type: 'REMOVE_ASSIGNMENT',
                        key: profile.proof_did,
                      })
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="input">
            <p className="label">Add address</p>
            <Input
              size="md"
              variant="flushed"
              colorScheme="purple"
              placeholder="ETH address (0x...)"
              textAlign="left"
              width="100%"
              margin="0 0 15px 0"
              value={assignmentInput}
              onChange={(e) =>
                dispatch({
                  type: 'POPOVER_ASSIGNMENT_INPUT',
                  value: e.target.value,
                })
              }
            />
            <ButtonGroup
              variant="solid"
              size="sm"
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                colorScheme="purple"
                width={120}
                onClick={async (e) => {
                  try {
                    const value = await Box.getProfile(assignmentInput);
                    if (!value.name) {
                      throw new Error('Invalid address');
                    }

                    dispatch({ type: 'ADD_ASSIGNMENT', value });
                  } catch (error) {
                    toast({
                      position: `bottom-right`,
                      title: `Invalid address`,
                      status: `error`,
                      duration: 5000,
                      isClosable: true,
                    });
                  }
                }}
              >
                Add
              </Button>
            </ButtonGroup>
          </div>

          <ButtonGroup
            variant="outline"
            size="lg"
            display="flex"
            justifyContent="center"
          >
            <Button
              colorScheme="purple"
              onClick={(e) =>
                dispatch({ type: 'POPOVER_ASSIGNMENT', value: false })
              }
            >
              Cancel
            </Button>
            <Button
              colorScheme="purple"
              onClick={async (e) => {
                dispatch({
                  type: 'SAVE_ASSIGNMENT',
                  value: assignmentProfiles,
                });
              }}
            >
              Save
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </MapPopoverContainer>
  );
};

export const MapPopover = connect((state: State) => ({
  id: state.map.id,
  background: state.map.popover.background,
  name: state.map.popover.name,
  assignment: state.map.popover.assignment,
  nameInput: state.map.popover.nameInput,
  assignmentInput: state.map.popover.assignmentInput,
  assignmentProfiles: state.map.popover.assignmentProfiles,
}))(MapPopoverComponent);
