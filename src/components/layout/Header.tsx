import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import { useState } from 'react';

export default function Header() {
   const [showSidebar, setShowSidebar] = useState(false);
   return (
      <Box as="header" display={['block', null, 'none']}>
         <IconButton
            aria-label="menu"
            icon={<HamburgerIcon />}
            variant="solid"
            boxSize="8"
            onClick={() => setShowSidebar(true)}
         />
      </Box>
   );
}
