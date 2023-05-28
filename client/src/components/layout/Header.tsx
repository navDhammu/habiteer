import { HamburgerIcon } from '@chakra-ui/icons'
import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    IconButton,
    useDisclosure,
} from '@chakra-ui/react'
import { Habit } from 'types/Habit'
import Sidebar from './sidebar'

type HeaderProps = {
    habits: Habit[]
}

export default function Header({ habits }: HeaderProps) {
    // mobile sidebar modal
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <>
            <Box as="header" display={['block', null, 'none']}>
                <IconButton
                    aria-label="menu"
                    icon={<HamburgerIcon />}
                    variant="unstyled"
                    boxSize="8"
                    onClick={onOpen}
                />
            </Box>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement="left"
                size="xs"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <Sidebar habits={habits} isMobile onClose={onClose} />
                </DrawerContent>
            </Drawer>
        </>
    )
}
