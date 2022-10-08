import {
  Box,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  Flex,
  FlexProps,
  Icon,
  Menu,
  MenuArrow,
  MenuButton,
  MenuList,
} from '@metafam/ds';
import { DesktopMenuItem } from 'components/MegaMenu/DesktopMenuItem';
import React from 'react';
import { MenuLinkItem, MenuLinkSet, MenuSectionLinks } from 'utils/menuLinks';

// Nav links on desktop -- text and links from utils/menuLinks.ts
export const DesktopNavLinks: React.FC<FlexProps> = (props) => (
  <Flex
    justify="center"
    h="100%"
    display={{ base: 'none', lg: 'flex' }}
    {...props}
  >
    {MenuSectionLinks.map((section: MenuLinkSet) => (
      <Menu key={section.label} offset={[0, 0]} preventOverflow placement="top">
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              variant="link"
              minW="fit-content"
              color="white"
              fontSize="lg"
              fontWeight={700}
              textTransform="uppercase"
              mx={6}
              _expanded={{ color: 'cyan.300' }}
              _focus={{ outline: 'none', border: 'none' }}
              rightIcon={
                isOpen ? (
                  <ChevronUpIcon color="white" />
                ) : (
                  <ChevronDownIcon color="white" />
                )
              }
            >
              {section.label}
              <Icon
                as={MenuArrow}
                position="absolute"
                left="calc(50% - 1.25rem)"
                top={14}
                w={6}
                h={isOpen ? 'auto' : 0}
                opacity={isOpen ? 1 : 0}
                fill="rgba(42, 31, 71, 0.9)"
                transition="opacity 0.2s"
                zIndex={2}
              />
            </MenuButton>
            {isOpen && (
              <Box
                position="absolute"
                minW="100vw"
                top="5rem"
                left="calc(100% - 100vw)"
                mx={0}
                h="100vh"
                bg="linear-gradient(rgba(0,0,0,0.9) 10%, rgba(0,0,0,0) 96%)"
                sx={{ filter: 'blur(3rem)' }}
                zIndex={-2}
              />
            )}
            <MenuList
              display="grid"
              gridTemplateColumns={
                section.menuItems.length > 4
                  ? 'repeat(2, 1fr)'
                  : 'repeat(1, 1fr)'
              }
              gridGap={2}
              w={section.menuItems.length > 4 ? '60rem' : '30rem'}
              p={4}
              boxShadow="dark-lg"
              bg="linear-gradient(180deg, rgba(42, 31, 71, 0.9) 6.18%, rgba(17, 3, 32, 0.86) 140%)"
              borderRadius="md"
              border={0}
            >
              {section.menuItems.map((item: MenuLinkItem) => (
                <DesktopMenuItem {...item} key={item.title} />
              ))}
            </MenuList>
          </>
        )}
      </Menu>
    ))}
  </Flex>
);
