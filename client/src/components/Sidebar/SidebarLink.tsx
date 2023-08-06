import { Box, Icon, Link, As } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link as WouterLink, useRoute } from 'wouter';

type SidebarLinkProps = {
   to: string;
   stat?: string;
   icon: As;
   children: ReactNode;
};

export default function SidebarLink(props: SidebarLinkProps) {
   const [isMatch] = useRoute(`/app/${props.to}`);

   return (
      <Link
         as={WouterLink}
         display="flex"
         alignItems="center"
         gap="2"
         fontSize="md"
         fontWeight={isMatch ? 'bold' : 'normal'}
         color={isMatch ? 'gray.900' : 'gray.500'}
         textTransform="capitalize"
         bg={isMatch ? 'gray.50' : ''}
         borderRight={isMatch ? '4px' : 'none'}
         borderColor="green.300"
         _hover={{
            bg: 'gray.50',
         }}
         py="1"
         px="2"
         href={props.to}
      >
         <Icon
            boxSize={8}
            as={props.icon}
            color={isMatch ? 'green.500' : 'gray.700'}
            w="12"
            h="12"
            p="3"
            borderRadius="2xl"
         />
         {props.children}
         {props.stat && (
            <Box
               as="span"
               ml="auto"
               mr="2"
               bg={isMatch ? 'gray.200' : 'gray.100'}
               rounded="full"
               color="gray.500"
               paddingX="2"
               fontSize="sm"
            >
               {props.stat}
            </Box>
         )}
      </Link>
   );
}
