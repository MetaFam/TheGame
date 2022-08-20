import {
  Box,
  BoxedNextImage,
  Button,
  keyframes,
  ListItem,
  Text,
  UnorderedList,
} from '@metafam/ds';
import externalLinkIcon from 'assets/landing/external-link-icon.png';
import octoImg from 'assets/octopus.png';
import { CONFIG } from 'config';
import { useGame } from 'contexts/GameContext';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import {
  safelyParseContent,
  safelyParseTextForTyping,
} from 'utils/stringHelpers';

import type {
  GameProperties,
  GamePropertiesType,
  IConnection,
  // IConnectionsObject,
  IElement,
  IJumper,
  // IJumpersObject,
} from './gameTypes';

export type CurrentElementState = IElement & {
  elementId: string;
};
export type ConnectionStateItem = IConnection & {
  connectionId: string;
};

export type CurrentJumperState = IJumper & {
  jumperId: string;
};

export const OnboardingGame: React.FC = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  // const scrollerRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const { gameState, handleChoice, resetGame } = useGame();
  const [currentElement, setCurrentElement] = useState<CurrentElementState>();
  const [currentConnections, setCurrentConnections] =
    useState<ConnectionStateItem[]>();
  const [currentJumpers, setCurrentJumpers] = useState<CurrentJumperState[]>();
  const [currentDialogue, setCurrentDialogue] =
    useState<CurrentSectionDialogueChoices['currentDialogue']>();
  const [currentChoices, setCurrentChoices] =
    useState<CurrentSectionDialogueChoices['currentChoices']>();
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [gameDataState, setGameDataState] = useState<GamePropertiesType | null>(
    null,
  );
  const [welcomeBack, setWelcomeBack] = useState(false);
  const blink = keyframes`
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;

    }

    100% {
      opacity: 0;
    }
  `;
  const typingAnimation = `${blink} 1s steps(10, start) infinite`;
  const pulseAnimation = `${blink} 2s infinite`;

  /** Function to async fetch `CONFIG.onboardingGameDataURL` as json and return the data */
  const fetchGameData = useCallback(async () => {
    try {
      // setIsLoading(true);
      console.log('fetchGameData');

      const response = await fetch(CONFIG.onboardingGameDataURL);
      const data = (await response.json()) as GameProperties;
      console.log('fetchGameData', data);
      const {
        assets,
        name,
        startingElement,
        elements,
        connections,
        jumpers,
        attributes,
        components,
      } = data;
      // setGameDataState(data);
      // setIsLoading(false);
      return {
        name,
        assets,
        startingElement,
        elements,
        connections,
        jumpers,
        attributes,
        components,
      } as GameProperties;
    } catch (error) {
      console.error(error);

      // setIsLoading(false);
      return {
        name: '',
        assets: {},
        startingElement: '',
        elements: {},
        connections: {},
        jumpers: {},
        attributes: {},
        components: {},
      } as GameProperties;
    }
  }, []);

  /** Sets the starting point for the game (startingElement or saved state) */
  const initGame = () => {
    setIsLoading(true);
    // if (gameDataState === null) {
    // return element;
    fetchGameData()
      .then((data) => {
        if (data) {
          setGameDataState(data);
          const state = gameState();

          const element =
            state !== null
              ? data.elements[state]
              : data.elements[data.startingElement];

          // console.log('gameDataState', data);
          const elementData: CurrentElementState = {
            ...element,
            elementId: state ?? data.startingElement,
          };
          console.log('elementData', elementData);

          setCurrentElement(elementData);
          // setCurrentConnections(
          //   data.connections[elementData.elementId] || [],
          // );
          // setCurrentJumpers(data.jumpers[elementData.elementId] || []);
          // setCurrentDialogue(elementData.dialogue);
          // setCurrentChoices(elementData.choices);
          // setIsLoading(false);
          return elementData;
        }
        throw new Error('No data found');
      })
      .then((data) => {
        if (data) {
          makeCurrentSectionDialogue(data);
          console.log('currentElement', currentElement, data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      })
      .finally(() => {});
  };

  const handleReset = () => {
    const isReset = resetGame();
    if (isReset) {
      initGame();
    }
  };

  /** Get the connections for the current element */
  const getConnections = (connectionIds: string[]) => {
    try {
      if (connectionIds.length > 0) {
        const elementConnections = connectionIds.map((id: string) => {
          const connectionData = {
            ...gameDataState?.connections[id],
            connectionId: id,
          };
          return connectionData;
        });

        // console.log('getConnections', { connectionIds, elementConnections });
        setCurrentConnections(elementConnections);
        return elementConnections;
      }
      throw new Error('No connections found');
    } catch (error) {
      // console.log('getConnections ', { error });
      return undefined;
    }
  };

  /** Get the jumpers, if any, for the current element */
  const getJumpers = (jumperIds: string[]) => {
    try {
      if (jumperIds.length > 0) {
        // console.log('getJumpers', { jumperIds });

        const elementJumpers = jumperIds.map((id: string) => {
          console.log('elementJumpers', { id });

          const jumperData = {
            ...gameDataState?.jumpers[id],
            jumperId: id,
            // elementId: jumpers[id].elementId,
          };
          console.log('jumperData', jumperData);

          return jumperData;
        });

        // console.log('getJumpers returns', { elementJumpers });

        setCurrentJumpers(elementJumpers);
        console.log('set jumpers', { elementJumpers });

        return elementJumpers;
      }
      throw new Error('No jumpers found');
    } catch (error) {
      // console.log('getJumpers ', { error });
      return undefined;
    }
  };

  /** Effect to make `scrollerRef` the same height as `scrollContentRef`
   *  so we get a scrollbar for the overflowing content */
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     if (scrollContentRef.current !== null && scrollerRef.current !== null) {
  //       console.log('scrollContentRef', scrollContentRef.current, scrollerRef.current);

  //       document.addEventListener('load', () => {
  //         console.log('listening', scrollContentRef.current, scrollerRef.current);
  //         if (scrollContentRef.current !== null && scrollerRef.current !== null) {

  //           scrollerRef.current.style.height = `${scrollContentRef.current.offsetHeight}px`;
  //         }
  //       })
  //     }
  //   }
  //     return (): void => {

  //         // scrollContentRef.current.removeEventListener('onchange')
  //     }

  // }, []);

  /** Welcome back for returning players */
  useEffect(() => {
    const state = gameState();
    if (state && gameDataState !== null) {
      const isReturning = state !== gameDataState.startingElement;
      setWelcomeBack(isReturning);
      setTimeout(() => {
        setWelcomeBack(false);
      }, 6000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameDataState]);

  /** Call the init() function on mount */
  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Call to get connections when the current element changes */
  useEffect(() => {
    if (currentElement !== undefined && currentElement.outputs !== null) {
      // setCurrentConnections([])
      getConnections(currentElement.outputs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentElement]);

  /** Call to get jumpers when the current element changes */
  useEffect(() => {
    if (currentConnections !== undefined && currentConnections.length > 0) {
      // setCurrentJumpers([])
      const jumpers: any[] = currentConnections.filter(
        (
          connection: ConnectionStateItem,
        ): IConnection['targetid'] | undefined => {
          if (connection.targetType === 'jumpers') {
            // console.log('We found a jumper', connection);
            return connection.targetid;
          }
          return undefined;
        },
      );
      if (jumpers !== undefined && jumpers.length > 0) {
        console.log('Mapping jumpers...', jumpers);

        const jumperIds = jumpers.map((jumper: IConnection) => jumper.targetid);
        console.log('jumperIds', jumperIds);
        getJumpers(jumperIds);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentElement]);

  interface CurrentSectionDialogueChoices {
    currentDialogue: JSX.Element[];
    currentChoices: JSX.Element[];
  }
  /**
   * Sanitizes & splits the element content into dialogue and
   * choices, adds them to state & returns the values if you want to use it that way */
  const makeCurrentSectionDialogue = (
    section: CurrentElementState,
  ): CurrentSectionDialogueChoices => {
    const { content, title } = section;
    const string = `${title ?? '<p></p>'}${content ?? '<p></p>'}`;
    const parsedContent: any = safelyParseTextForTyping(string);
    const dialogue: any[] = [];
    const choices: any[] = [];

    /**
     * if it is set, take the parsedContent, find & push paragraphs that contain *no* links as child elements
     * into the `dialogue` array.
     * if the paragraph has a link, push it into the `choices` array.
     */
    if (parsedContent.length > 0) {
      console.log('parsedContent', parsedContent);
      parsedContent.forEach((paragraph: JSX.Element) => {
        const { children } = paragraph.props;
        console.log('children', children);

        if (children) {
          const hasLink = children.type === 'a';
          if (!hasLink) {
            console.log('no link', paragraph);

            dialogue.push(paragraph);
          } else {
            console.log('has link', children);
            choices.push(children);
          }
        }
        return paragraph;
      });
    }
    setCurrentDialogue(dialogue);
    setCurrentChoices(choices);
    console.log('makeCurrentSectionDialogue', { dialogue, choices });
    return {
      currentDialogue: dialogue,
      currentChoices: choices,
    };
  };

  /** Handles the typing effect.
   * TODO: probs should be extracteed to a separate component/function */
  useEffect(() => {
    if (typeof window !== 'undefined' && currentDialogue !== undefined) {
      // makeCurrentSectionDialogue(currentElement);
      setIsTyping(true);
      const elementsToType = document.querySelectorAll('.typing-text');
      // console.log('elementsToType', elementsToType);

      const phrases: string[] = [];
      elementsToType.forEach((element) => {
        if (element.textContent !== null) {
          phrases.push(element.textContent);
        }
        // eslint-disable-next-line no-param-reassign
        element.textContent = '';
      });

      let i = 0;
      let j = 0;
      let currentPhrase: string[] = [];
      let hasEnded = false;
      const loop = () => {
        if (i < elementsToType.length) {
          if (j <= phrases[i].length) {
            elementsToType[i].classList.remove('typed');
            elementsToType[i].classList.add('typing');

            currentPhrase.push(phrases[i][j]);

            elementsToType[i].textContent = currentPhrase.join('');
            elementsToType[i].appendChild(document.createElement('span'));
            j++;
          }

          if (j === phrases[i].length) {
            if (i < elementsToType.length - 1) {
              elementsToType[i].classList.remove('typing');
              elementsToType[i].classList.add('typed');
            }
            currentPhrase = [];
            j = 0;
            i++;
          }
          if (i === phrases.length) {
            hasEnded = true;
            console.log('hasEnded', hasEnded);

            setIsTyping(false);
          }
        }

        const randomiseSpeed = Math.random() * (100 - 5) + 5;
        setTimeout(loop, randomiseSpeed);
      };
      loop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, currentElement]);

  const handleProgress = (elementId: string) => {
    let hasRun = false;
    let elId: string = elementId;
    setIsLoading(true);
    console.log('hasrun', hasRun);

    console.log('handleProgress', { elementId, currentJumpers });
    const jumperOrElement = (id: string) => {
      console.log('jumperOrElement', { id, currentJumpers });

      if (currentJumpers !== undefined && currentJumpers.length > 0) {
        for (let i = 0; i < currentJumpers.length; i++) {
          console.log('currentJumpers[i]', currentJumpers[i]);

          const jumper = currentJumpers[i];
          if (jumper.jumperId === id) {
            console.log('jumper translate', jumper.elementId);

            elId = jumper.elementId;
          }
          console.log('jumper', { id, jumper, elId });
        }
      }
      console.log('element', { id, elId });

      elId = id;
      hasRun = true;
    };

    jumperOrElement(elId);

    if (hasRun) {
      console.log('hasRun', elId);

      handleChoice(elId)
        .then((data) => {
          console.log('handleChoice returned', { data });

          const nextElement =
            data !== undefined
              ? { ...gameDataState?.elements[data], elementId: data }
              : undefined;
          if (nextElement !== undefined) {
            console.log('nextElement', nextElement);

            setCurrentElement(nextElement);
            makeCurrentSectionDialogue(nextElement);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log('handleProgress error: ', { err });
          setIsLoading(false);
        });
      hasRun = false;
    }
  };

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      height="100vh"
      width="100%"
      fontFamily="onboarding"
      justifyContent={isLoading ? 'center' : 'flex-start'}
      alignContent="center"
      alignItems="center"
      py={32}
    >
      <Box
        ref={ref}
        position="absolute"
        // border="1px solid"
        top="25vh"
        right={0}
        width={1}
        height="50vh"
        pointerEvents="none"
        zIndex={0}
      />
      {!isLoading && gameDataState !== null ? (
        <Box
          position="fixed"
          bottom="22%"
          flexDirection="column"
          justifyContent="flex-start"
          color="var(--chakra-colors-landing550)"
          textShadow={`0 0 10px var(--chakra-colors-landing500)`}
          maxW="3xl"
          height="100vh"
          maxH="66vh"
          overflowY="auto"
          width="100%"
          // border="1px solid var(--chakra-colors-landing550)"
          fontSize={{ base: '1.5rem', md: '5xl', xl: '4xl', '2xl': '3rem' }}
          lineHeight={{
            base: '2.25rem',
            md: '2rem',
            xl: '2rem',
            '2xl': '4rem',
          }}
          pl={{ base: 0, md: 0 }}
          py={{ base: 10, md: 10 }}
          zIndex={onScreen ? 0 : -20}
          transform={`translate3d(0, ${'0'}, 0)`}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          {/* <Box ref={scrollerRef} position="relative" width="100%" overflowY="visible"> */}
          {/* {currentElement !== undefined ? ( */}
          <Box
            ref={scrollContentRef}
            className="step"
            // height="auto" minH="fit-content" width="full" opacity={onScreen ? 1 : 0} zIndex={onScreen ? 0 : -20} position="absolute" bottom="0"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            flexGrow={1}
            height="full"
            opacity={onScreen ? 1 : 0}
            transition="opacity 0.5s 0.2s ease-in"
          >
            <Box
              className="question"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                justifySelf: 'flex-start',
                // border: '1px solid var(--chakra-colors-landing550)',
                lineHeight: 1,
                mb: 2,
                p: {
                  fontSize: 'large',
                  lineHeight: '1.7rem',
                  marginBottom: '1rem',
                  // opacity: isLoading ? 0 : 1,
                  // transform: isLoading
                  //   ? 'translate3d(0, -10px, 0)'
                  //   : 'translate3d(0, 0, 0)',
                  // transition:
                  //   'transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in',
                },

                '.typing-text': {
                  '&.typed': {
                    display: 'block',
                  },
                  display: 'none',
                  '&.typing': {
                    display: 'block',
                    span: {
                      display: 'inline-block',
                      right: 0,
                      bottom: 0,
                      transform: 'translate3d(0, 1px, 0)',
                      height: '1rem',
                      width: 0,
                      borderLeft: '2px solid var(--chakra-colors-landing550)',
                      filter:
                        'drop-shadow(0 0 0.5rem var(--chakra-colors-landing500))',
                      animation: typingAnimation,
                    },
                  },
                },
              }}
            >
              <Box
                opacity={welcomeBack ? 1 : 0}
                transition="all 0.3s ease"
                fontSize="3xl"
                width="100%"
                visibility={welcomeBack ? 'visible' : 'hidden'}
                aria-hidden={welcomeBack ? 'false' : 'true'}
                height={welcomeBack ? 'auto' : '0'}
                mb={welcomeBack ? 6 : 0}
                textAlign="left"
              >
                Welcome back Anon!
              </Box>

              {currentElement &&
                currentDialogue !== undefined &&
                currentDialogue.map((dialogue) => dialogue)}
            </Box>
            <Box
              className="responses"
              fontSize="large"
              justifySelf="flex-end"
              flexGrow={0}
              width="full"
              flexShrink={0}
              lineHeight={1}
              sx={{
                p: {
                  fontSize: 'large',
                  lineHeight: '1.7rem',
                  marginBottom: '1rem',
                  // opacity: isLoading ? 0 : 1,
                  // transform: isLoading
                  //   ? 'translate3d(0, -10px, 0)'
                  //   : 'translate3d(0, 0, 0)',
                  // transition:
                  //   'transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in',
                },
                a: {
                  position: 'relative',
                  display: 'inline-flex',
                  lineHeight: '1.7rem',
                  color: 'var(--chakra-colors-landing550)',
                  borderBottom: '2px solid var(--chakra-colors-landing550)',
                  '&::after': {
                    content: '" "',
                    display: 'block',
                    position: 'absolute',
                    right: -5,
                    top: 0,
                    width: '0.75rem',
                    height: '0.75rem',
                    backgroundImage: `url(${externalLinkIcon})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '0.75rem',
                    backgroundPosition: 'center',
                    filter:
                      'drop-shadow(0 0 0.5rem var(--chakra-colors-landing500))',
                  },
                },
              }}
            >
              <UnorderedList
                listStyleType="none"
                display="flex"
                flexFlow="column wrap"
                alignItems="flex-start"
                width="full"
                ml={0}
                opacity={isTyping ? 0 : 1}
                height={isTyping ? '0' : 'auto'}
                overflowX="hidden"
                transition="all 0.3s ease"
              >
                {currentElement &&
                  currentChoices &&
                  currentChoices.map((choice, i) => (
                    <ListItem
                      key={`${choice.props.href}-${i}`}
                      className="response"
                      width="100%"
                      ml={0}
                      mb={3}
                      opacity={isTyping ? 0 : 1}
                      transform={`translate3d(0, ${isTyping ? -10 : 0}, 0)`}
                      lineHeight={1}
                      transition={`opacity 0.3s 0.${
                        i * 3
                      }s ease-in, transform 0.2s 0.${i * 3}s ease-in-out`}
                    >
                      {choice}
                    </ListItem>
                  ))}
                {currentConnections && currentConnections.length > 0 ? (
                  currentConnections.map(
                    (connection: ConnectionStateItem, i: number) => {
                      const { label } = connection as ConnectionStateItem;
                      const btnText = safelyParseContent(label) as ReactElement;
                      // console.log('btnText', btnText.props.children);

                      return (
                        <ListItem
                          key={connection.connectionId}
                          className="response"
                          width="100%"
                          ml={0}
                          mb={3}
                          opacity={isTyping ? 0 : 1}
                          transform={`translate3d(0, ${isTyping ? -10 : 0}, 0)`}
                          lineHeight={1}
                          transition={`opacity 0.3s 0.${
                            i * 3
                          }s ease-in, transform 0.2s 0.${i * 3}s ease-in-out`}
                        >
                          <Button
                            onClick={() => handleProgress(connection.targetid)}
                            variant="ghost"
                            px={0}
                            py={0}
                            display="inline-block"
                            fontWeight="normal"
                            textShadow={`0 0 8px var(--chakra-colors-landing500)`}
                            borderBottom="2px solid var(--chakra-colors-landing550)"
                            borderRadius="inherit inherit 0 0"
                            wordBreak="break-word"
                            textAlign="left"
                            width={'auto'}
                            _hover={{
                              backgroundColor: 'transparent',
                              color: 'var(--chakra-colors-landing500)',
                              borderBottom:
                                '2px solid var(--chakra-colors-landing500)',
                            }}
                            fontSize="large"
                            sx={{
                              '& > p': {
                                display: 'inline-block',
                              },
                            }}
                          >
                            {connection.label
                              ? btnText.props.children
                              : 'What else?'}
                          </Button>
                        </ListItem>
                      );
                    },
                  )
                ) : (
                  <Box>
                    <Text mb={5}>Tumbleweed rolls by...</Text>
                  </Box>
                )}
              </UnorderedList>
              <Button
                variant="ghost"
                display="inline-block"
                fontWeight="normal"
                transition="all 0.3s ease"
                textShadow={`0 0 8px var(--chakra-colors-landing500)`}
                borderBottom="2px solid var(--chakra-colors-landing550)"
                _hover={{
                  backgroundColor: 'transparent',
                  color: 'var(--chakra-colors-landing500)',
                  borderBottom: '2px solid var(--chakra-colors-landing500)',
                }}
                borderRadius="inherit inherit 0 0"
                wordBreak="break-word"
                px={0}
                textAlign="left"
                fontSize="large"
                onClick={handleReset}
              >
                Start again
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        // </Box>
        <BoxedNextImage
          src={octoImg}
          animation={pulseAnimation}
          position="relative"
          width="50%"
          maxW="lg"
          height="33%"
        />
      )}
    </Box>
  );
};

export interface GameData {
  data: string;
}
