import { Button, Flex, FlexProps, HStack, Select } from '@metafam/ds';
import React from 'react';

type Props = FlexProps & {
  boxList: string[];
  setNewBox: (name: string) => void;
};

export const PlayerAddSection: React.FC<Props> = ({
  boxList,
  setNewBox,
  ...props
}) => {
  const [show, setShow] = React.useState(false);
  const addSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShow(false);
    setNewBox(e.target.value);
  };

  return (
    <Flex
      bg="whiteAlpha.200"
      borderBottomRadius="lg"
      border="dashed 1px rgba(255, 255, 255, 0.3)"
      borderTopRadius="lg"
      py={12}
      boxShadow="md"
      css={{ backdropFilter: 'blur(8px)' }}
      {...props}
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
              onChange={addSection}
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
