import {
   Box,
   Button,
   TabProps,
   useMultiStyleConfig,
   useTab,
} from '@chakra-ui/react';
import { Dayjs } from 'dayjs';
import { forwardRef } from 'react';

// custom tab component
const DateTab = forwardRef<HTMLButtonElement, TabProps & { date: Dayjs }>(
   (props, ref) => {
      const tabProps = useTab({ ...props, ref });
      const isSelected = !!tabProps['aria-selected'];
      const styles = useMultiStyleConfig('Tabs', tabProps);

      return (
         <Button
            __css={styles.tab}
            {...tabProps}
            border="none"
            display="flex"
            flexDirection="column"
            alignItems="center"
            isDisabled={props.isDisabled}
         >
            <Box as="span" color="gray.500">
               {props.date.format('dddd')[0]}
            </Box>

            {isSelected ? (
               <Box
                  as="span"
                  bg="green.400"
                  borderRadius="full"
                  color="white"
                  w="8"
                  h="8"
                  lineHeight="8"
               >
                  {props.date.date()}
               </Box>
            ) : (
               <Box fontWeight="bold">{props.date.date()}</Box>
            )}
         </Button>
      );
   }
);

export default DateTab;
