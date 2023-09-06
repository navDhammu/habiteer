import { List, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { CompletionsProps } from './Completions';
import CompletionsFilters, { Filters } from './CompletionsFilters';
import CompletionsListItem from './CompletionsListItem';

type CompletionsListProps = Pick<
   CompletionsProps,
   'completionsList' | 'onCompletionStatusChange'
>;

export default function CompletionsList(props: CompletionsListProps) {
   const [selectedFilters, setSelectedFilters] = useState<Filters>([]);

   const resetFilters = () => setSelectedFilters([]);
   const removeFilter = (filter: Filters[number]) =>
      setSelectedFilters(
         selectedFilters.filter((filterName) => filterName !== filter)
      );
   const addFilter = (filter: Filters[number]) =>
      setSelectedFilters([...selectedFilters, filter]);

   const filteredList = !selectedFilters.length
      ? props.completionsList
      : props.completionsList.filter((completion) =>
           selectedFilters.includes(completion.completionStatus)
        );

   if (!props.completionsList.length)
      return <Text>There are no habits scheduled for this date.</Text>;

   return (
      <>
         <CompletionsFilters
            selectedFilters={selectedFilters}
            addFilter={addFilter}
            removeFilter={removeFilter}
            resetFilters={resetFilters}
         />
         {!filteredList.length ? (
            <Text>No results match filter criteria</Text>
         ) : (
            <List mt="4">
               {filteredList.map((completion) => (
                  <CompletionsListItem
                     completion={completion}
                     onCompletionStatusChange={props.onCompletionStatusChange}
                  />
               ))}
            </List>
         )}
      </>
   );
}
