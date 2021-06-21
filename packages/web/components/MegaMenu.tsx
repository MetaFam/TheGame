import {
  Avatar,
  Badge,
  Box,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from '@metafam/ds';
import Image from 'next/image';
import React from 'react';

export const MegaMenu: React.FC = () => {
  const sections = [
    {
      label: 'home',
    },
    {
      label: 'community',
      menuItems: [
        {
          title: 'Players',
          explainerText:
            'Find players of MetaGame; their NFTs, their skills & whatever else they put on there',
        },
        {
          title: 'Patrons',
          explainerText:
            'Check the patrons of MetaGame; the ones supporting MetaGame by buying Seeds',
        },
        {
          title: 'Discord',
          explainerText: 'Engage in conversations with the MetaGame community ',
        },
        {
          title: 'Guilds',
          explainerText:
            'Discover the guilds of MetaGame; groups of players set around more specific goals',
        },
        {
          title: 'Alliances',
          explainerText:
            'Explore the alliances of MetaGame; groups of guilds spanning across the metaverse',
        },
        {
          title: 'Forum',
          explainerText:
            'Take part in slower & more thoughtful conversations on the forum',
        },
      ],
    },
    {
      label: 'learn',
      menuItems: [
        {
          title: 'MetaGame Wiki',
          explainerText:
            'New to MetaGame? This is the first thing you should dive deep into',
        },
        {
          title: 'Playbooks',
          explainerText:
            'Playbooks are short tutorials on achieving greatness, written by other players',
        },
        {
          title: 'Skill Trees',
          explainerText:
            'Skill Trees are meant to help people discover paths of self-development',
        },
        {
          title: 'Welcome to MetaGame',
          explainerText:
            'Just joined MetaGame? Check this for learning about how to get started',
        },
        {
          title: 'The Great Houses',
          explainerText:
            'The Great Houses are here to give people a meta view of different areas of interest',
        },
        {
          title: 'Asketh',
          explainerText:
            'Asketh is a place for players of MetaGame to ask whatever question they might have',
        },
      ],
    },
    {
      label: 'contribute',
      menuItems: [
        {
          title: 'Roles',
          explainerText:
            'Find about all roles in MetaGame, see which ones are open & how to play them',
        },
        {
          title: 'Raids',
          explainerText:
            'See which raids are currently ongoing, learn more about them & get involved',
        },
        {
          title: 'Quests',
          explainerText:
            'Take a look at available quest and claim ones that suit you best',
        },
      ],
    },
    {
      label: 'invest',
      menuItems: [
        {
          title: 'Seed',
          explainerText:
            'Find out all about the Seeds; why, where & how you should buy them',
        },
        {
          title: 'Grants',
          explainerText:
            'Find cool projects & people you could support financially',
        },
      ],
    },
  ];
  return (
    <Flex
      as="nav"
      align="center"
      fontFamily="IBM Plex Sans"
      pt={1.5}
      pl={8}
      pb={1.5}
      pr={8}
      borderBottom="1px"
      bg="rgba(0,0,0,0.2)"
      borderColor="#2B2244"
    >
      <Box className="logo">
        <Image src="/assets/logo.png" height={64} width={49.5} />
      </Box>
      <Spacer />
      <Flex className="section-links">
        {sections.map((section) => (
          <>
            {section.menuItems ? (
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      as={Button}
                      variant="link"
                      color="#ffffff"
                      fontSize="xl"
                      fontWeight="600"
                      textTransform="uppercase"
                      ml={23}
                      mr={23}
                      _expanded={{ color: '#FD9FE3' }}
                      _focus={{ outline: 'none', border: 'none' }}
                    >
                      {section.label}
                      {isOpen ? (
                        <ChevronUpIcon color="#ffffff" />
                      ) : (
                        <ChevronDownIcon color="#ffffff" />
                      )}
                    </MenuButton>
                    {section.menuItems.length > 3 ? (
                      <MenuList
                        display="grid"
                        gridTemplateColumns="repeat(2, 1fr)"
                        width="72vw"
                        p={7}
                      >
                        {section.menuItems.map((item) => (
                          <MenuItem
                            color="#000"
                            display="flex"
                            alignItems="top"
                            p={7}
                            key={item.title}
                          >
                            <Avatar
                              name="Icon"
                              src="https://bit.ly/dan-abramov"
                              mr={5}
                              width={24}
                              height={24}
                            />
                            <Box>
                              <Text fontSize="xl" fontWeight="700">
                                {item.title}
                              </Text>
                              <Text font="IBM Plex Sans">
                                {item.explainerText}
                              </Text>
                            </Box>
                          </MenuItem>
                        ))}
                      </MenuList>
                    ) : (
                      <MenuList
                        display="grid"
                        gridTemplateColumns="repeat(1, 1fr)"
                        width="36vw"
                        p={7}
                      >
                        {section.menuItems.map((item) => (
                          <MenuItem
                            color="#000"
                            display="flex"
                            alignItems="top"
                            _first={{ pt: '7', pb: '6' }}
                            _even={{ pt: '6', pb: '6' }}
                            _last={{ pt: '6', pb: '7' }}
                            pl={7}
                            key={item.title}
                          >
                            <Avatar
                              name="Icon"
                              src="https://bit.ly/dan-abramov"
                              mr={5}
                              width={24}
                              height={24}
                            />
                            <Box>
                              <Text fontSize="xl" fontWeight="700">
                                {item.title}
                              </Text>
                              <Text font="IBM Plex Sans">
                                {item.explainerText}
                              </Text>
                            </Box>
                          </MenuItem>
                        ))}
                      </MenuList>
                    )}
                  </>
                )}
              </Menu>
            ) : (
              <Link
                href="/"
                fontSize="xl"
                fontWeight="600"
                textTransform="uppercase"
                m={4}
              >
                {section.label}
              </Link>
            )}
          </>
        ))}
      </Flex>
      <Spacer />
      <Flex align="center">
        <Badge
          color="#fff"
          pt={2}
          pr={4}
          pb={2}
          pl={4}
          bg="rgba(0,0,0,0.25)"
          border="1px solid #2B2244"
          borderRadius="16px"
        >
          <Image src="/assets/xp-star.png" height={16} width={16} /> 668
        </Badge>
        <Badge
          color="#fff"
          m={2}
          pt={2}
          pr={4}
          pb={2}
          pl={4}
          bg="rgba(0,0,0,0.25)"
          border="1px solid #2B2244"
          borderRadius="16px"
        >
          <Image src="/assets/seed-market.png" height={16} width={16} /> 262.81
        </Badge>
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          width="52px"
          height="52px"
          ml={4}
        />
      </Flex>
    </Flex>
  );
};
