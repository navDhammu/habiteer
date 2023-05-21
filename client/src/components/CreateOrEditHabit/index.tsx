import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useToast,
} from '@chakra-ui/react'
import { useId, useState } from 'react'
import { Habit } from 'types/Habit'

import HabitForm, { FormValues } from './HabitForm'

export type Props = {
    isDrawerOpen: boolean
    onCloseDrawer: () => void
    initialValues?: Habit
}

export default function CreateOrEditHabit({
    isDrawerOpen,
    onCloseDrawer,
    initialValues,
}: Props) {
    const formId = useId()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const isEditMode = !!initialValues
    const toast = useToast()

    const handleSubmit = (data: FormValues) => {
        setIsSubmitting(true)
        let promise = Promise.resolve()
        promise
            .then(() =>
                toast({
                    title: `${isEditMode ? 'Edit' : 'Create'} Habit`,
                    description: `habit successfully ${
                        isEditMode ? 'edited' : 'created'
                    }`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            )
            .catch((e) => alert(e))
            .finally(() => {
                setIsSubmitting(false)
                onCloseDrawer()
            })
    }
    return (
        <Drawer
            isOpen={isDrawerOpen}
            onClose={onCloseDrawer}
            placement="right"
            size="md"
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                    {isEditMode ? 'Edit' : 'Create'} Habit
                </DrawerHeader>
                <DrawerBody>
                    <HabitForm
                        formId={formId}
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                    />
                </DrawerBody>
                <DrawerFooter>
                    <Button
                        isLoading={isSubmitting}
                        type="submit"
                        form={formId}
                        variant="solid"
                        colorScheme="green"
                    >
                        Save {isEditMode ? 'Changes' : 'Habit'}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
