import {
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from '@metafam/ds';
import { useRouter } from 'next/router';
import React from 'react';
import { BsCircleFill, BsDot, BsFillCircleFill } from 'react-icons/bs';
import { FaDotCircle } from 'react-icons/fa';
import { MdCheckCircle, MdChevronRight } from 'react-icons/md';

export interface Perk {
  perk: string;
  checked: boolean;
}

type CardProps = {
  title?: string;
  type?: string;
  image?: string;
  description?: React.ReactNode;
  action?: string;
  list?: Perk[];
  width?: string;
  background?: string;
  badgeColor?: string;
  route?: string;
  link?: string;
  recommended?: boolean;
};

export const RoleCard: React.FC<CardProps> = ({
  title,
  image,
  description,
  recommended,
  action,
  route,
  link,
}) => {
  const router = useRouter();
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
  return (
    <Box
      h="full"
      w={{ base: 'full', lg: 'sm' }}
      border={{ base: '1px solid #FF00FF', lg: '4px solid #FF00FF' }}
      borderRadius={18}
      display="flex"
      flexDir="column"
      alignItems="center"
      gap={{ base: 0, lg: 3 }}
      p={{ base: 3, lg: 6 }}
    >
      <Flex
        w="full"
        direction={{ base: 'row', lg: 'column' }}
        justify="center"
        align="center"
        gap={3}
      >
        <Image
          src={image}
          h={{ base: '24px', lg: '50%' }}
          w={{ base: '24px', lg: '50%' }}
          borderRadius="full"
        />
        <Text
          flexGrow={1}
          fontSize={{ base: 'lg', lg: '2xl' }}
          fontWeight="semibold"
        >
          {title}
        </Text>
        {recommended && (
          <Badge
            borderRadius="full"
            variant="subtle"
            colorScheme="purple"
            p={2}
            fontSize="0.4em"
          >
            RECOMMENDED
          </Badge>
        )}
        {isMobile && (
          <>
            {route && (
              <IconButton
                variant="ghost"
                colorScheme="pink"
                aria-label="Become a player"
                onClick={() => router.push(route)}
                fontSize="4xl"
                icon={<MdChevronRight />}
              />
            )}
            {link && (
              <Link href={link}>
                <IconButton
                  variant="ghost"
                  colorScheme="pink"
                  aria-label="Become a player"
                  fontSize="4xl"
                  icon={<MdChevronRight />}
                />
              </Link>
            )}
          </>
        )}
      </Flex>
      {description}
      {!isMobile && (
        <>
          {route && (
            <Button
              colorScheme="pink"
              textTransform="uppercase"
              onClick={() => router.push(route)}
            >
              {action}
            </Button>
          )}
          {link && (
            <Link href={link}>
              <Button textTransform="uppercase" colorScheme="pink">
                {action}
              </Button>
            </Link>
          )}
        </>
      )}
    </Box>
  );
};

export const PerksCard: React.FC<CardProps> = ({
  title,
  type,
  list,
  width = 'md',
  description,
  background,
  badgeColor,
}) => (
  <Box
    h="full"
    w={{ base: 'full', lg: width }}
    bg={background}
    display="flex"
    flexDir="column"
    alignItems="center"
    gap={3}
    p={6}
  >
    {title && (
      <Badge
        borderRadius="full"
        variant="subtle"
        textTransform="uppercase"
        colorScheme={badgeColor}
        p={2}
        fontSize="0.4em"
      >
        {title}
      </Badge>
    )}
    {description}
    <Text fontSize="xl" textTransform="uppercase">
      {type}
    </Text>
    <List fontSize="md" fontWeight="light">
      {list?.map((item, idx) => (
        <ListItem key={idx}>
          <ListIcon
            as={item?.checked ? MdCheckCircle : BsCircleFill}
            color={item?.checked ? 'green.500' : 'gray.600'}
            alignItems="center"
          />
          {item.perk}
        </ListItem>
      ))}
    </List>
  </Box>
);
