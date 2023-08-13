import { Completion } from '@api';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
   Button,
   Card,
   CardBody,
   CardHeader,
   CardProps,
   Flex,
   HStack,
   Heading,
   Menu,
   MenuButton,
   MenuItemOption,
   MenuList,
   MenuOptionGroup,
   StackDivider,
   Tag,
   TagCloseButton,
   TagLabel,
   Text,
   VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import HabitCompletion from './HabitCompletion';

type HabitCompletionsProps = {
   completionsList: Completion[];
   onCompletionStatusChange: (completion: Completion) => void;
};

type Filters = Array<'complete' | 'incomplete' | 'pending'>;
const FILTERS: Filters = ['complete', 'incomplete', 'pending'];

export function HabitCompletions({
   completionsList,
   onCompletionStatusChange,
}: HabitCompletionsProps & CardProps) {
   if (!completionsList.length)
      return <Text>There are no habits scheduled for this date.</Text>;

   const [selectedFilters, setSelectedFilters] = useState<Filters>([]);

   const filteredCompletions = selectedFilters.length
      ? completionsList.filter((completion) =>
           selectedFilters.includes(completion.completionStatus)
        )
      : completionsList;

   return (
      <Card variant="outline">
         <CardHeader textTransform="capitalize">
            <Flex justifyContent="space-between" alignItems="center">
               <Heading size="md">Scheduled habits</Heading>
               <Menu closeOnSelect={false}>
                  <MenuButton
                     as={Button}
                     size="sm"
                     variant="outline"
                     rightIcon={<ChevronDownIcon />}
                  >
                     Filter By
                  </MenuButton>
                  <MenuList minWidth="240px">
                     <MenuOptionGroup
                        title="Completion status"
                        type="checkbox"
                        value={selectedFilters}
                        onChange={(selected) =>
                           setSelectedFilters(selected as Filters)
                        }
                     >
                        {FILTERS.map((filter) => (
                           <MenuItemOption
                              key={filter}
                              value={filter}
                              textTransform="capitalize"
                           >
                              {filter}
                              {}
                           </MenuItemOption>
                        ))}
                     </MenuOptionGroup>
                  </MenuList>
               </Menu>
            </Flex>
            <HStack spacing="2" mt="3" flexWrap="wrap">
               {selectedFilters.map((selectedFilter) => (
                  <Tag
                     key={selectedFilter}
                     size="sm"
                     borderRadius="full"
                     variant="solid"
                     colorScheme="teal"
                  >
                     <TagLabel>{selectedFilter}</TagLabel>
                     <TagCloseButton
                        onClick={() =>
                           setSelectedFilters(
                              selectedFilters.filter(
                                 (filter) => filter !== selectedFilter
                              )
                           )
                        }
                     />
                  </Tag>
               ))}
               {selectedFilters.length > 0 && (
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => setSelectedFilters([])}
                     rightIcon={<SmallCloseIcon />}
                  >
                     Clear filters
                  </Button>
               )}
            </HStack>
         </CardHeader>
         <CardBody
            as={VStack}
            w="full"
            pt="0"
            align="stretch"
            divider={<StackDivider />}
            spacing="4"
         >
            {filteredCompletions.length === 0 ? (
               <Text>No results match filter criteria</Text>
            ) : (
               filteredCompletions.map((item) => (
                  <HabitCompletion
                     completion={item}
                     key={item.id}
                     onCompletionStatusChange={onCompletionStatusChange}
                  />
               ))
            )}
         </CardBody>
      </Card>
   );
}
