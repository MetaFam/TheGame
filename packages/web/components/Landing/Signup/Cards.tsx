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
  Text,
  useBreakpointValue,
} from '@metafam/ds';
import { useRouter } from 'next/router';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';
import { MdChevronRight } from 'react-icons/md';

import { Perk, RoleTitle } from './data';

type CardProps = {
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
  info?: string;
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
  info,
  route,
  link,
}) => {
  const router = useRouter();
  const activeTab = router.query.tab ?? RoleTitle.Player;
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
  return (
    <Box
      h={{ sm: 'full', lg: '494px' }}
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
          {description}{' '}
          {description.includes('Detailed instructions') &&
            activeTab === RoleTitle.Patron &&
            (isMobile ? '👉' : '👇')}
        </Text>
      )}
      {info && (
        <Text
          fontSize={{ base: 'md', lg: '2xl' }}
          align={{ base: 'start', lg: 'center' }}
          fontWeight="bold"
        >
          {info}
        </Text>
      )}
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
  type,
  list,
  price,
  id,
  width = 'md',
  description,
  background,
}) => (
  <Box
    h={list && list.length > 10 ? '620px' : 'full'}
    w={{ base: 'full', lg: width }}
    bg={background}
    display="flex"
    flexDir="column"
    alignItems="center"
    gap={3}
    p={6}
  >
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
      <List fontSize="md" fontWeight="light">
        {list?.map((item, idx) => (
          <ListItem key={idx}>
            <ListIcon
              as={!!id && item?.[id] ? BsFillCheckCircleFill : FaCircle}
              color={!!id && item?.[id] ? 'green.500' : 'gray.600'}
            />
            {item.title}
          </ListItem>
        ))}
      </List>
    )}
  </Box>
);

export const PerksChecklist: React.FC<{ perks: Perk[], id: keyof Perk, badgeColor: string, altBackground?: boolean }> = ({ perks, id, badgeColor, altBackground }) => (
  <Box
    h="full"
    w="129px"
    bg={altBackground ? "#00000029" : "#FFFFFF0A"}
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
        colorScheme={badgeColor}
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
          />
        </ListItem>
      ))}
    </List>
  </Box>
)



