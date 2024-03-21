import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@metafam/ds';
import { useRouter } from 'next/router';
import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';
import { MdChevronRight } from 'react-icons/md';

import { Perk, PerkList } from './data';

interface PerksChecklistProps {
  perks: Perk[];
  id: keyof Perk;
  altBackground?: boolean;
}

interface CardProps {
  title?: string;
  type?: string;
  image?: string;
  price?: string;
  id?: keyof Perk;
  description?: string;
  action?: string;
  list?: Perk[];
  width?: string;
  background?: string;
  badgeColor?: string;
  route?: string;
  link?: string;
  recommended?: boolean;
}

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
      w={{ sm: 'full', lg: '320px' }}
      border={{ base: '1px solid #FF00FF', lg: '4px solid #FF00FF' }}
      borderRadius={18}
      display="flex"
      flexDir="column"
      alignItems="center"
      gap={{ base: 0, lg: 3 }}
      p={{ base: 4, lg: 6 }}
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
          h={{ base: '24px', lg: '150px' }}
          w={{ base: '24px', lg: '150px' }}
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
      {description && (
        <Text
          fontSize={{ base: 'md', lg: '2xl' }}
          align={{ base: 'start', lg: 'center' }}
        >
          {description}
        </Text>
      )}
      {!isMobile && (
        <>
          {route && (
            <Button
              textTransform="uppercase"
              colorScheme="pink"
              onClick={() => router.push(route)}
            >
              {action}
            </Button>
          )}
          {link && (
            <Button
              textTransform="uppercase"
              colorScheme="pink"
              onClick={() => {
                window.location.href = link;
              }}
            >
              {action}
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export const PerksCard: React.FC<CardProps> = ({
  title,
  type,
  id,
  list,
  price,
  width = 'md',
  description,
  background,
  badgeColor,
}) => {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
  return (
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
      {title && !isMobile && (
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
      {price && (
        <Text fontSize="xl" fontWeight="semibold">
          {price}
        </Text>
      )}
      {description && (
        <Text fontSize="xl" fontWeight="light">
          {description}
        </Text>
      )}
      {type && (
        <Text fontSize="xl" textTransform="uppercase">
          {type}
        </Text>
      )}
      {list && list.length > 0 && (
        <List
          fontSize="md"
          fontWeight="light"
          justifyContent="center"
          spacing="12px"
        >
          {list?.map((item, idx) => (
            <ListItem
              key={idx}
              color={!!id && item?.[id] ? 'white' : 'gray.400'}
            >
              <ListIcon
                as={!!id && item?.[id] ? BsFillCheckCircleFill : FaCircle}
                color={!!id && item?.[id] ? 'green.500' : 'gray.600'}
                h={!!id && item?.[id] ? 4 : 3}
                w={!!id && item?.[id] ? 4 : 3}
              />
              {item.title}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export const PerksChecklist: React.FC<PerksChecklistProps> = ({
  perks,
  id,
  altBackground,
}) => (
  <Box
    h="full"
    w="129px"
    bg={altBackground ? '#00000029' : '#FFFFFF0A'}
    display="flex"
    flexDir="column"
    alignItems="center"
    gap="20px"
    p="20px 20px 10px 20px"
  >
    {id && (
      <Badge
        borderRadius="full"
        variant="subtle"
        textTransform="uppercase"
        colorScheme={(() => {
          if (id === 'free') return 'green';
          if (id === 'basic') return 'purple';
          if (id === 'pro') return 'pink';
          return 'gray';
        })()}
        p={2}
        fontSize="0.4em"
      >
        {id}
      </Badge>
    )}
    <List fontSize="md" fontWeight="light" spacing="14px">
      {perks?.map((perk, idx) => (
        <ListItem key={idx}>
          <ListIcon
            as={
              (perk.type === 'Player' && perk[id]) ||
              (perk.type === 'Guild' && perk[id]) ||
              (perk.type === 'Patron' && perk[id])
                ? BsFillCheckCircleFill
                : FaCircle
            }
            color={
              (perk.type === 'Player' && perk[id]) ||
              (perk.type === 'Guild' && perk[id]) ||
              (perk.type === 'Patron' && perk[id])
                ? 'green.500'
                : 'gray.600'
            }
            h={perk[id] ? 4 : 3}
            w={perk[id] ? 4 : 3}
          />
        </ListItem>
      ))}
    </List>
  </Box>
);
