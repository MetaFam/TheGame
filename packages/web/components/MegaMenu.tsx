import {
  Avatar,
  Badge,
  Box,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  Flex,
  HamburgerIcon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@metafam/ds';
import Image from 'next/image';
import React from 'react';

const SectionLinks = ({ sections }: { sections: any }) => (
  <Flex className="section-links" display={['none', 'none', 'none', 'flex']}>
    {sections.map((section: any) => (
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
                    {section.menuItems.map((item: any) => (
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
                          <Text font="IBM Plex Sans">{item.explainerText}</Text>
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
                    {section.menuItems.map((item: any) => (
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
                          <Text font="IBM Plex Sans">{item.explainerText}</Text>
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
);

export const MegaMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuToggle = () => (isOpen ? onClose() : onOpen());

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
          url: 'https://my.metagame.wtf/players',
        },
        {
          title: 'Patrons',
          explainerText:
            'Check the patrons of MetaGame; the ones supporting MetaGame by buying Seeds',
          url: 'https://my.metagame.wtf/patrons',
        },
        {
          title: 'Discord',
          explainerText: 'Engage in conversations with the MetaGame community ',
          url: 'https://discord.gg/VYZPBnx',
        },
        {
          title: 'Guilds',
          explainerText:
            'Discover the guilds of MetaGame; groups of players set around more specific goals',
          url:
            'https://wiki.metagame.wtf/docs/enter-metagame/guilds-of-metagame',
        },
        {
          title: 'Alliances',
          explainerText:
            'Explore the alliances of MetaGame; groups of guilds spanning across the metaverse',
          url: 'https://wiki.metagame.wtf/docs/great-houses/house-of-daos',
        },
        {
          title: 'Forum',
          explainerText:
            'Take part in slower & more thoughtful conversations on the forum',
          url: 'https://forum.metagame.wtf/',
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
          url: 'https://wiki.metagame.wtf/docs/wtf-is-metagame/wtf-is-metagame',
        },
        {
          title: 'Playbooks',
          explainerText:
            'Playbooks are short tutorials on achieving greatness, written by other players',
          url: 'https://wiki.metagame.wtf/docs/playbooks/browse',
        },
        {
          title: 'Skill Trees',
          explainerText:
            'Skill Trees are meant to help people discover paths of self-development',
          url: 'https://wiki.metagame.wtf/',
        },
        {
          title: 'Welcome to MetaGame',
          explainerText:
            'Just joined MetaGame? Check this for learning about how to get started',
          url: 'https://wiki.metagame.wtf/',
        },
        {
          title: 'The Great Houses',
          explainerText:
            'The Great Houses are here to give people a meta view of different areas of interest',
          url: 'https://wiki.metagame.wtf/docs/great-houses/house-of-daos',
        },
        {
          title: 'Asketh',
          explainerText:
            'Asketh is a place for players of MetaGame to ask whatever question they might have',
          url: 'https://wiki.metagame.wtf/',
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
          url:
            'https://wiki.metagame.wtf/docs/enter-metagame/roles-in-metagame#main-roles',
        },
        {
          title: 'Raids',
          explainerText:
            'See which raids are currently ongoing, learn more about them & get involved',
          url: 'https://wiki.metagame.wtf/docs/enter-metagame/navigation-board',
        },
        {
          title: 'Quests',
          explainerText:
            'Take a look at available quest and claim ones that suit you best',
          url: 'https://wiki.metagame.wtf/',
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
          url: 'https://wiki.metagame.wtf/docs/how-does-it-work/xp',
        },
        {
          title: 'Grants',
          explainerText:
            'Find cool projects & people you could support financially',
          url: 'https://wiki.metagame.wtf/',
        },
      ],
    },
  ];

  return (
    <Stack position="sticky" top={0} zIndex={1}>
      <Flex
        as="nav"
        align="center"
        fontFamily="IBM Plex Sans"
        h="10vh"
        pt={1.5}
        pl={4}
        pb={1.5}
        pr={4}
        borderBottom="1px"
        bg="rgba(0,0,0,0.5)"
        borderColor="#2B2244"
      >
        <Box className="logo">
          <Image src="/assets/logo.png" height={44} width={36} />
        </Box>
        <Spacer />
        <SectionLinks sections={sections} />
        <Spacer />
        <Flex align="center" display="flex" ml={2} mr={2}>
          <Badge
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
            color="#fff"
            pt={2}
            pr={4}
            pb={2}
            pl={4}
            bg="rgba(0,0,0,0.25)"
            border="1px solid #2B2244"
            borderRadius={50}
          >
            <Image src="/assets/xp-star.png" height={16} width={16} /> 668
          </Badge>
          <Badge
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
            color="#fff"
            m={2}
            pt={2}
            pr={4}
            pb={2}
            pl={4}
            bg="rgba(0,0,0,0.25)"
            border="1px solid #2B2244"
            borderRadius={50}
          >
            <Image src="/assets/seed-market.png" height={16} width={16} /> 262
          </Badge>
          <Avatar
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            width="52px"
            height="52px"
            // ml={4}
          />
        </Flex>
        <Box
          onClick={menuToggle}
          display={{ base: 'block', lg: 'none' }}
          pt={2}
          pl={4}
          pb={2}
          pr={4}
          border="2px"
          borderColor="purple.700"
          borderRadius={4}
        >
          Menu
          {isOpen ? (
            <CloseIcon color="#ffffff" ml={2} />
          ) : (
            <HamburgerIcon color="#ffffff" ml={2} />
          )}
        </Box>
      </Flex>
      <Stack
        display={{ base: isOpen ? 'block' : 'none', xl: 'none' }}
        position="absolute"
        top="9vh"
        zIndex={1}
        overflowY="scroll"
        w="100vw"
        h="90vh"
        bg="rgba(0,0,0,0.9)"
        backdrop-filter="blur(10px)"
        pt={4}
        pl={4}
        pb={16}
        pr={4}
        border="none"
      >
        {sections.map((section) => (
          <>
            {section.menuItems ? (
              <Stack mb={4}>
                <Text
                  fontSize="xl"
                  fontWeight="600"
                  textTransform="capitalize"
                  mt={4}
                  mb={2}
                >
                  {section.label}
                </Text>
                <SimpleGrid columns={2}>
                  {section.menuItems.map((item) => (
                    <Link
                      display="flex"
                      href={item.url}
                      p={4}
                      border="1px"
                      borderColor="purple.400"
                    >
                      <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/tioluwani-kolawole"
                        width={8}
                        height={8}
                        mr={4}
                      />
                      {item.title}
                    </Link>
                  ))}
                </SimpleGrid>
              </Stack>
            ) : null}
          </>
        ))}
      </Stack>
    </Stack>
  );
};
