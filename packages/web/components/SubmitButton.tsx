import { Button, ButtonProps } from '@metafam/ds';

export const SubmitButton: React.FC<ButtonProps> = (props) => (
  <Button
    px={{ base: 6, md: 10 }}
    borderRadius="full"
    fontSize={props.fontSize || 16}
    height={{ base: 10, md: 12 }}
    _hover={{
      bg: 'purple80',
    }}
    bg="main"
    {...props}
  />
);
