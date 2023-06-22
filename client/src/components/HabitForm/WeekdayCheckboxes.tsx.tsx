import {
    Flex,
    useCheckbox,
    chakra,
    Text,
    Box,
    UseCheckboxProps,
    useCheckboxGroup,
    UseCheckboxGroupProps,
    HStack,
} from '@chakra-ui/react'
import { WEEKDAYS } from 'utils/dates'

export default function WeekdayCheckboxes(props: UseCheckboxGroupProps) {
    const { getCheckboxProps } = useCheckboxGroup({
        value: props.value,
        onChange: props.onChange,
    })

    return (
        <HStack wrap="wrap" fontSize="sm">
            {WEEKDAYS.map((weekday) => (
                <WeekdayCheckbox
                    id={weekday}
                    {...getCheckboxProps({ value: weekday })}
                />
            ))}
        </HStack>
    )
}

function WeekdayCheckbox(props: UseCheckboxProps) {
    const {
        state: { isChecked },
        getCheckboxProps,
        getInputProps,
        getLabelProps,
        htmlProps,
    } = useCheckbox(props)

    return (
        <chakra.label
            display="flex"
            flexDirection="row"
            alignItems="center"
            gridColumnGap={2}
            maxW="40"
            bg={isChecked ? 'green.50' : 'gray.50'}
            border="1px solid"
            borderColor={isChecked ? 'green.500' : 'gray.500'}
            rounded="lg"
            px={3}
            py={1}
            cursor="pointer"
            {...htmlProps}
        >
            <input {...getInputProps()} hidden />
            <Flex
                alignItems="center"
                justifyContent="center"
                border="2px solid"
                borderColor={isChecked ? 'green.500' : 'gray.500'}
                w={4}
                h={4}
                {...getCheckboxProps()}
            >
                {isChecked && <Box w={2} h={2} bg="green.500" />}
            </Flex>
            <Text color="gray.700" {...getLabelProps()}>
                {props.value}
            </Text>
        </chakra.label>
    )
}
