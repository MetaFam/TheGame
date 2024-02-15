import {
  Box,
  Button,
  HStack,
  Icon,
  Tooltip,
  usePrefersReducedMotion,
  useToast,
} from '@metafam/ds';
import { get, set } from 'lib/store';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

interface ToggleEffectsButtonProps {
  hasLabel?: boolean;
}

/**
 * Toggles the effects on the site in components that make use of the `useMotionDetector` hook.
 * It sets an `EffectsPreference` variable in localStorage to save the users preference.
 * @param hasLabel - Displays a label next to the button (used in the mobile menu)
 */
const ToggleEffectsButton: FC<ToggleEffectsButtonProps> = ({
  hasLabel = false,
}) => {
  const { pathname } = useRouter();
  const isLandingPage = pathname === '/';
  const toast = useToast();
  const prefersReducedMotion = usePrefersReducedMotion();
  const savedEffectsPreference = !!(
    get('EffectsPreference') === 'enabled' || get('EffectsPreference') === null
  );
  const [effectsEnabled, setEffectsEnabled] = useState<boolean>(
    savedEffectsPreference,
  );
  const toggleIcon = effectsEnabled ? FaToggleOn : FaToggleOff;

  useEffect(() => {
    const root = typeof window !== 'undefined' ? document.body : null;
    const className = 'no-motion';
    if (effectsEnabled) {
      root?.classList.remove(className);
    } else {
      root?.classList.add(className);
    }
  }, [effectsEnabled]);

  const handleToggle = useCallback(() => {
    const newPreference = !effectsEnabled;
    setEffectsEnabled(newPreference);
    set('EffectsPreference', newPreference ? 'enabled' : 'disabled');

    toast({
      title: 'Effects preference saved',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  }, [effectsEnabled, toast]);

  useEffect(() => {
    if (!savedEffectsPreference && prefersReducedMotion) {
      handleToggle();
    }
  }, [prefersReducedMotion, savedEffectsPreference, handleToggle]);

  if (isLandingPage) return <div />;

  return (
    <HStack
      spacing={0}
      position={{ base: 'absolute', xl: 'relative' }}
      bottom={{ base: 4, xl: 'unset' }}
      left={{ base: 0, xl: 'unset' }}
    >
      <Tooltip label={effectsEnabled ? 'Effects Off' : 'Effects On'}>
        <Button
          className="toggle-bg"
          onClick={handleToggle}
          variant="ghost"
          color="white"
          pointerEvents="all"
          opacity={hasLabel ? 1 : 0.3}
          _hover={{
            opacity: 1,
          }}
          transition="all 0.2s ease-in-out"
          zIndex={100}
        >
          <Icon as={toggleIcon} h={{ base: 8, '2xl': 10 }} w="auto" />
        </Button>
      </Tooltip>
      {hasLabel ? (
        <Box as="span" fontSize="small">
          Turn {`${effectsEnabled ? 'off' : 'on'}`} effects
        </Box>
      ) : null}
    </HStack>
  );
};

export default ToggleEffectsButton;
