import { IconFolder } from "@tabler/icons";
import { format } from "date-fns";
import useForm from "hooks/useForm";
import { useState } from "react";
import { createHabit, editHabit } from "services/dbOperations";
import { toISOFormat } from "utils/dates";
import {
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Heading,
  FormErrorMessage,
  Icon,
  Wrap,
  Box,
  WrapItem,
  VStack,
  Text,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Button,
  DrawerOverlay,
} from "@chakra-ui/react";

const DATE_FORMAT = "yyyy-MM-dd";

const initialEmptyValues = {
  habitName: "",
  habitDescription: "",
  habitCategory: "",
  trackingStartDate: toISOFormat(new Date()),
  repeatDays: [
    { id: 0, name: "Sunday", checked: true },
    { id: 1, name: "Monday", checked: true },
    { id: 2, name: "Tuesday", checked: true },
    { id: 3, name: "Wednesday", checked: true },
    { id: 4, name: "Thursday", checked: true },
    { id: 5, name: "Friday", checked: true },
    { id: 6, name: "Saturday", checked: true },
  ],
};

const customValidations = {
  repeatDays: {
    isValid(data) {
      return data.some(({ checked }) => checked);
    },
    message: "At least one day must be selected",
  },
};

const onSubmit = (mode, onClose) => (data) => {
  console.log("submitting");
  switch (mode) {
    case "CREATE":
      return createHabit(data).then(onClose);
    case "EDIT":
      return editHabit(data).then(onClose);
    default:
      throw new Error(`invalid mode ${mode}`);
  }
};

export default function CreateOrEditHabit({
  mode = "CREATE",
  isDrawerOpen,
  onCloseDrawer,
  initialValues,
  onClose,
}) {
  const {
    data: formData,
    errors,
    handleChange,
    handleInvalid,
    handleSubmit,
    isSubmitting,
  } = useForm({
    initialValues: initialValues || initialEmptyValues,
    customValidations,
    onSubmit: onSubmit(mode, onClose),
  });

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={onCloseDrawer}
      placement="right"
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Create New Habit</DrawerHeader>
        <DrawerBody>
          <Box as="form" id="create-edit-habit" onSubmit={handleSubmit}>
            <VStack spacing="4" align="start">
              <Heading size="sm">1. Choose habit name and category</Heading>
              <FormControl isInvalid={errors.habitName != null}>
                <FormLabel>Habit Name</FormLabel>
                <Input
                  placeholder="eg. Read for 30 minutes"
                  value={formData.habitName}
                  onChange={handleChange("habitName")}
                  onInvalid={handleInvalid("habitName")}
                  required
                />
                <FormErrorMessage>{errors.habitName}</FormErrorMessage>
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
                    placeholder="Choose Category"
                    value={formData.habitCategory}
                    onChange={handleChange("habitCategory")}
                    onInvalid={handleInvalid("habitCategory")}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.habitCategory}</FormErrorMessage>
              </FormControl>
            </VStack>
            <VStack spacing="4" align="start" mt="4">
              <Heading size="sm">2. Create habit repeat schedule</Heading>
              <FormControl isInvalid={errors.trackingStartDate != null}>
                <FormLabel>Start tracking from</FormLabel>
                <Input
                  type="date"
                  disabled={mode === "EDIT"}
                  value={formData.trackingStartDate}
                  onChange={handleChange("trackingStartDate")}
                  onInvalid={handleInvalid("trackingStartDate")}
                  min={format(new Date(), DATE_FORMAT)}
                  required
                />
                <FormErrorMessage>{errors.trackingStartDate}</FormErrorMessage>
              </FormControl>
              <FormControl as="fieldset" isInvalid={errors.repeatDays != null}>
                <FormLabel as="legend">Habit repeat schedule</FormLabel>
                <Wrap spacing="4">
                  {formData.repeatDays.map(({ id, name, checked }) => (
                    <WrapItem>
                      <Checkbox
                        id={id}
                        colorScheme="green"
                        name={name}
                        isChecked={checked}
                        onChange={handleChange("repeatDays")}
                      >
                        {name}
                      </Checkbox>
                    </WrapItem>
                  ))}
                </Wrap>
                <FormErrorMessage>{errors.repeatDays}</FormErrorMessage>
              </FormControl>
            </VStack>
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Button
            isLoading={isSubmitting}
            type="submit"
            form="create-edit-habit"
            variant="solid"
            colorScheme="green"
          >
            Save Habit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
