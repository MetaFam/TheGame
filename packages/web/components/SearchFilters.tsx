import { Box, Text, VStack, Wrap } from '@metafam/ds';
import { useRouter } from 'next/router';
import { GlobalFilters } from 'utils/GlobalSearch';

const FilterItems = [
  {
    name: GlobalFilters.PLAYERS,
    baseUrl: '/search/players',
  },
  {
    name: GlobalFilters.GUILDS,
    baseUrl: '/search/guilds',
  },
  {
    name: GlobalFilters.PATRONS,
    baseUrl: '/search/patrons',
  },
];
interface SearchFiltersProps {
  activeFilter: string;
  search: string;
}
const SearchFilters: React.FC<SearchFiltersProps> = ({
  activeFilter,
  search,
}) => {
  const router = useRouter();

  return (
    <VStack w="100%" spacing={{ base: 4, md: 8 }} pb={{ base: 16, lg: 0 }}>
      <Text fontSize="lg" fontWeight="bold" as="div" mx="auto">
        Search Results for "{search}"
      </Text>
      <Wrap
        transition="all 0.25s"
        py={2}
        style={{ backdropFilter: 'blur(7px)' }}
        position="sticky"
        top="-1px"
        borderTop="1px solid transparent"
        zIndex={1}
        justify="center"
        w="100%"
        maxW="79rem"
        px={6}
        borderRadius="md"
      >
        {FilterItems.map((item) => (
          <Box
            p={4}
            borderBottomWidth={activeFilter === item.name ? '1px' : '0px'}
            borderBottomColor={
              activeFilter === item.name ? 'cyanText' : undefined
            }
            onClick={() => router.push(`${item.baseUrl}?q=${search}`)}
          >
            <Text
              cursor="pointer"
              color={activeFilter === item.name ? 'cyanText' : 'gray.400'}
              fontSize="xl"
            >
              {item.name}
            </Text>
          </Box>
        ))}
      </Wrap>
    </VStack>
  );
};

export default SearchFilters;
