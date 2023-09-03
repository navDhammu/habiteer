import { As, Icon, Link } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { Link as WouterLink, useRoute } from 'wouter';

export default function NavLink(
   props: PropsWithChildren & { href: string; icon: As }
) {
   const [isActive] = useRoute(`/app/${props.href}`);

   return (
      <WouterLink href={props.href}>
         <Link
            display="flex"
            gap="1"
            alignItems="center"
            justifyContent="center"
            h="full"
            fontWeight={isActive ? 'bold' : 'normal'}
            borderBottom="4px"
            borderBottomColor={isActive ? 'green.500' : 'transparent'}
            _hover={{ borderBottomColor: !isActive ? 'gray.100' : '' }}
         >
            <Icon as={props.icon} boxSize={isActive ? '5' : '4'} />
            {props.children}
         </Link>
      </WouterLink>
   );
}
