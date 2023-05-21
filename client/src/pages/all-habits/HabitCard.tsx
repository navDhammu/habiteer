import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    useToast,
} from '@chakra-ui/react'

import { Icon } from '@chakra-ui/icons'
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react'
import CreateOrEditHabit from 'components/CreateOrEditHabit'
import { useRef, useState } from 'react'
import { Habit } from 'types/Habit'

export default function HabitCard(props: Habit) {
    const [isEditingHabit, setIsEditingHabit] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const cancelRef = useRef(null)
    const toast = useToast()

    const closeDeleteDialogue = () => setIsDeleteDialogOpen(false)

    const handleDelete = () =>
        Promise.resolve().then(() => {
            closeDeleteDialogue()
            toast({
                description: `Deleted habit ${props.name}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        })

    return (
        <>
            <CreateOrEditHabit
                isDrawerOpen={isEditingHabit}
                initialValues={{ ...props }}
                onCloseDrawer={() => setIsEditingHabit(false)}
            />
            <AlertDialog
                isOpen={isDeleteDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={closeDeleteDialogue}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Habit
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete habit{' '}
                            <Box as="em" bg="gray.200" p="1">
                                {props.name}
                            </Box>{' '}
                            ? This cannot be undone.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                onClick={closeDeleteDialogue}
                                ref={cancelRef}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={handleDelete}
                                ml={3}
                            >
                                Delete Habit
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Card>
                <CardHeader as={Flex} alignItems="center" gap="2">
                    <Heading size="sm">{props.name}</Heading>
                    <Tag>{props.category || 'Not Categorized'}</Tag>
                    <Badge colorScheme="green">active</Badge>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            variant="ghost"
                            ml="auto"
                            aria-label="habit actions"
                            icon={<IconDots />}
                        />
                        <MenuList>
                            <MenuItem onClick={() => setIsEditingHabit(true)}>
                                <Icon as={IconEdit} mr="3" />
                                Edit
                            </MenuItem>
                            <MenuItem
                                onClick={() => setIsDeleteDialogOpen(true)}
                                color="red"
                            >
                                <Icon as={IconTrash} mr="3" />
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </CardHeader>
                <CardBody fontSize="sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptas in sapiente deserunt, facere laboriosam soluta
                    accusamus.
                </CardBody>
            </Card>
        </>
    )
}
