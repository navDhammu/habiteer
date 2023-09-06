import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
   Box,
   Button,
   HStack,
   Menu,
   MenuButton,
   MenuItemOption,
   MenuList,
   MenuOptionGroup,
   Tag,
   TagCloseButton,
   TagLabel,
} from '@chakra-ui/react';

const FILTERS: Filters = ['complete', 'incomplete', 'pending'];

export type Filters = Array<'complete' | 'incomplete' | 'pending'>;

type HabitCompletionFiltersProps = {
   selectedFilters: Filters;
   addFilter: (filter: Filters[number]) => void;
   removeFilter: (filter: Filters[number]) => void;
   resetFilters: () => void;
};

export default function CompletionsFilters({
   selectedFilters,
   removeFilter,
   resetFilters,
   addFilter,
}: HabitCompletionFiltersProps) {
   return (
      <Box>
         <HStack spacing="2" my="3" flexWrap="wrap">
            <Menu closeOnSelect={false}>
               <MenuButton
                  as={Button}
                  size="sm"
                  variant="outline"
                  rightIcon={<ChevronDownIcon />}
                  float="right"
               >
                  Filter By
               </MenuButton>
               <MenuList minWidth="240px">
                  <MenuOptionGroup
                     title="Completion status"
                     type="checkbox"
                     value={selectedFilters}
                  >
                     {FILTERS.map((filter) => (
                        <MenuItemOption
                           key={filter}
                           value={filter}
                           onClick={() =>
                              selectedFilters.includes(filter)
                                 ? removeFilter(filter)
                                 : addFilter(filter)
                           }
                           textTransform="capitalize"
                        >
                           {filter}
                           {}
                        </MenuItemOption>
                     ))}
                  </MenuOptionGroup>
               </MenuList>
            </Menu>
            {selectedFilters.length > 0 && (
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => resetFilters()}
                  rightIcon={<SmallCloseIcon />}
               >
                  Clear filters
               </Button>
            )}
         </HStack>
         {selectedFilters.map((selectedFilter) => (
            <Tag
               key={selectedFilter}
               size="sm"
               borderRadius="full"
               variant="solid"
               colorScheme="teal"
               mr="2"
            >
               <TagLabel>{selectedFilter}</TagLabel>
               <TagCloseButton onClick={() => removeFilter(selectedFilter)} />
            </Tag>
         ))}
      </Box>
   );
}
