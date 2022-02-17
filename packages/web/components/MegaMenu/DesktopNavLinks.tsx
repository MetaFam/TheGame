import {
  Box,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
} from '@metafam/ds';
import { DesktopMenuItem } from 'components/MegaMenu/DesktopMenuItem';
import React from 'react';
import { MenuLinkItem, MenuLinkSet, MenuSectionLinks } from 'utils/menuLinks';

// Nav links on desktop -- text and links from utils/menuLinks.ts
export const DesktopNavLinks = () => (
  <Flex
    justifyContent="center"
    alignContent="center"
    display={{ base: 'none', lg: 'flex' }}
  >
    {MenuSectionLinks.map((section: MenuLinkSet) => (
      <Menu
        key={section.label}
        offset={[0, 0]}
        preventOverflow
        flip={false}
        placement="bottom"
      >
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              variant="link"
              minW="fit-content"
              color="#FFF"
              fontSize={['md', 'md', 'md', 'lg']}
              fontWeight={700}
              textTransform="uppercase"
              mx={23}
              _expanded={{ color: 'cyan.300' }}
              _focus={{ outline: 'none', border: 'none' }}
            >
              {section.label}
              {isOpen ? (
                <ChevronUpIcon color="#FFF" />
              ) : (
                <ChevronDownIcon color="#FFF" />
              )}
              <Icon
                position="absolute"
                left="calc(50% - 1.25rem)"
                top={14}
                width={6}
                borderColor="transparent"
                h={isOpen ? 'auto' : 0}
                opacity={isOpen ? 1 : 0}
                transition="opacity 0.2s"
                zIndex={2}
              >
                <path
                  d="M12 0L24 12C14.6274 12 9.37258 12 0 12L12 0Z"
                  fill="rgba(42, 31, 71, 0.99)"
                />
              </Icon>
            </MenuButton>
            {isOpen && (
              <Box
                position="absolute"
                minW="100vw"
                top="81px"
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
                section.menuItems.length > 3
                  ? 'repeat(2, 1fr)'
                  : 'repeat(1, 1fr)'
              }
              width={section.menuItems.length > 3 ? '948px' : '474px'}
              p="2rem"
              boxShadow="dark-lg"
              bg="linear-gradient(180deg, rgba(42, 31, 71, 0.9) 6.18%, rgba(17, 3, 32, 0.86) 140%)"
              borderRadius="0.618vmax"
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
