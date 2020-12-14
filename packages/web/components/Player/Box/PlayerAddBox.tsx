import { Button, Flex, HStack, Select } from '@metafam/ds';
import React from 'react';

type Props = { boxList: string[]; setNewBox: (name: string) => void };
export const PlayerAddBox: React.FC<Props> = ({ boxList, setNewBox }) => {
  const [show, setShow] = React.useState(false);
  const addBox = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShow(false);
    setNewBox(e.target.value);
  };

  return (
    <Flex
      h="200px"
      bg="whiteAlpha.200"
      borderBottomRadius="lg"
      border="dashed 1px rgba(255, 255, 255, 0.3)"
      borderTopRadius="lg"
      p={6}
      boxShadow="md"
      css={{ backdropFilter: 'blur(8px)' }}
    >
      {!show && (
        <Button
          onClick={() => setShow(true)}
          m="auto"
          bg="blue20"
          _hover={{ bg: 'purpleBoxLight', opacity: '0.8' }}
          color="offwhite"
          opacity="0.4"
        >
          ADD NEW SECTION
        </Button>
      )}
      {show && (
        <>
          <HStack m="auto">
            <Select
              css={{
                '&>option': {
                  backgroundColor: '#40347C',
                  borderBottom: '2px solid #962d22',
                },
              }}
              placeholder="Select a section"
              borderColor="offwhite"
              onChange={addBox}
            >
              {!(boxList || []).length && (
                <option value="nothing" disabled>
                  No choice :/
                </option>
              )}
              {(boxList || []).sort().map((box) => (
                <option value={box} key={box}>
                  {box}
                </option>
              ))}
            </Select>
            <Button
              onClick={() => setShow(false)}
              bg="blue20"
              _hover={{ bg: 'purpleBoxLight', opacity: '1' }}
              color="offwhite"
              opacity="0.8"
            >
              CANCEL
            </Button>
          </HStack>
        </>
      )}
    </Flex>
  );
};
