import {
    Box,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'
import { IconFolder } from '@tabler/icons-react'
import { format, formatISO, parseISO } from 'date-fns'
import { useState } from 'react'
import { Habit } from 'types/Habit'

const today = format(new Date(), 'yyyy-MM-dd')

type HabitFormProps = {
    formId: string
    onSubmit: (data: FormValues) => void
    initialValues?: Habit
}

export type FormValues = Omit<Habit, 'id'>

export default function HabitForm({
    formId,
    initialValues,
    onSubmit,
}: HabitFormProps) {
    const [values, setValues] = useState<FormValues>(
        initialValues || {
            name: '',
            category: '',
            description: '',
            repeatDays: {
                Monday: true,
                Tuesday: true,
                Wednesday: true,
                Thursday: true,
                Friday: true,
                Saturday: true,
                Sunday: true,
            },
            trackingStartDate: new Date(),
        }
    )
    const [errors, setErrors] = useState<{
        [Property in keyof FormValues]?: string
    }>({})

    const isEditMode = !!initialValues

    const handleChange =
        (key: keyof Habit) => (e: React.ChangeEvent<HTMLInputElement>) => {
            if (key === 'trackingStartDate') {
                setValues({
                    ...values,
                    [key]: parseISO(e.target.value),
                })
            } else if (key === 'repeatDays') {
                setValues({
                    ...values,
                    [key]: {
                        ...values.repeatDays,
                        [e.target.name]: e.target.checked,
                    },
                })
            } else {
                setValues({ ...values, [key]: e.target.value })
            }
        }

    return (
        <Box
            as="form"
            id={formId}
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                onSubmit(values)
            }}
            noValidate
        >
            <VStack spacing="4" align="start">
                <Heading size="sm">
                    1. {isEditMode ? 'Choose' : 'Edit'} habit name and category
                </Heading>
                <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Habit Name</FormLabel>
                    <Input
                        name="name"
                        placeholder="eg. Read for 30 minutes"
                        value={values.name}
                        onChange={handleChange('name')}
                        required
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Habit Category
                        <Text as="span" ml="2" fontSize="sm" color="gray.400">
                            optional
                        </Text>
                    </FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={IconFolder} color="gray.400" />
                        </InputLeftElement>
                        <Input
                            name="category"
                            placeholder="Choose Category"
                            value={values.category}
                            onChange={handleChange('category')}
                        />
                    </InputGroup>
                </FormControl>
            </VStack>
            <VStack spacing="4" align="start" mt="4">
                <Heading size="sm">
                    2. {isEditMode ? 'Create' : 'Edit'} habit repeat schedule
                </Heading>
                <FormControl isInvalid={!!errors.trackingStartDate}>
                    <FormLabel>Start tracking from</FormLabel>
                    <Input
                        type="date"
                        name="trackingStartDate"
                        disabled={isEditMode}
                        value={formatISO(values.trackingStartDate, {
                            representation: 'date',
                        })}
                        onChange={handleChange('trackingStartDate')}
                        min={today}
                        required
                    />
                    <FormErrorMessage>
                        {errors.trackingStartDate}
                    </FormErrorMessage>
                </FormControl>
                <FormControl as="fieldset" isInvalid={!!errors.repeatDays}>
                    <FormLabel as="legend">Habit repeat schedule</FormLabel>
                    <Wrap spacing="4">
                        {Object.keys(values.repeatDays).map((day) => (
                            <WrapItem key={day}>
                                <Checkbox
                                    colorScheme="green"
                                    name={day}
                                    value={day}
                                    isChecked={
                                        values.repeatDays[
                                            day as keyof FormValues['repeatDays']
                                        ]
                                    }
                                    onChange={handleChange('repeatDays')}
                                >
                                    {day}
                                </Checkbox>
                            </WrapItem>
                        ))}
                    </Wrap>
                    <FormErrorMessage>{errors.repeatDays}</FormErrorMessage>
                </FormControl>
            </VStack>
        </Box>
    )
}
