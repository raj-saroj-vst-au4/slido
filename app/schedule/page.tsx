"use client";
import ActionMenu from "../Components/ActionMenu";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Select,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import axios from "axios";

const steps = [
  { title: "First", description: "About Session" },
  { title: "Second", description: "Date & Time" },
  { title: "Third", description: "Participants & Share" },
];

const Schedule = () => {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [participants, setParticipants] = useState("");
  const [customList, setCustomList] = useState("");
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const handleCreateSession = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}createSession`, {
        title,
        pin,
        date,
        time,
        participants,
        customList,
      })
      .then((result) => {
        console.log(result);
      });
  };
  return (
    <div className="p-4">
      <ActionMenu />
      <div className="p-12 text-white">
        <Stepper size="lg" index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription className="text-slate-300">
                  {step.description}
                </StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <section className="flex justify-center items-center h-96 mt-8 pt-5">
          <div className={activeStep === 1 ? "block" : "hidden"}>
            <h2 className="text-3xl font-bold text-center mb-3">
              Session Topic
            </h2>
            <Input
              variant="filled"
              placeholder="ex:- Javascript Hoisting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <h2 className="text-3xl font-bold text-center mt-6 mb-2">
              Create a Secret Pin
            </h2>
            <div className="flex justify-center">
              <HStack>
                <PinInput defaultValue={pin} onChange={(e) => setPin(e)}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </div>
            <div className="text-center mt-8">
              <Button
                rightIcon={<BsCaretRightFill />}
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                  setActiveStep(2);
                }}
              >
                Next
              </Button>
            </div>
          </div>
          <div className={activeStep === 2 ? "block" : "hidden"}>
            <h2 className="text-3xl font-bold text-center mb-3">Date & Time</h2>
            <div className="flex justify-around">
              <HStack>
                <Input type="date" onChange={(e) => setDate(e.target.value)} />
                <Input type="time" onChange={(e) => setTime(e.target.value)} />
              </HStack>
            </div>
            <div className="flex justify-around mt-8 items-center">
              <Button
                leftIcon={<BsCaretLeftFill />}
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                  setActiveStep(1);
                }}
              >
                Previous
              </Button>
              <Center height="30px">
                <Divider orientation="vertical" />
              </Center>
              <Button
                rightIcon={<BsCaretRightFill />}
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                  setActiveStep(3);
                }}
              >
                Next
              </Button>
            </div>
          </div>
          <div className={activeStep === 3 ? "block" : "hidden"}>
            <h2 className="text-3xl font-bold text-center mb-3">Configure</h2>
            <Select
              bg="blue.800"
              variant="filled"
              placeholder="Select Participants"
              onChange={(e) => setParticipants(e.target.value)}
            >
              <option className="text-slate-800" value="open">
                Open for All !
              </option>
              {/* <option className="text-slate-800" value="selected">
                Select from Registered Users{" "}
              </option> */}
              <option className="text-slate-800" value="custom">
                Enter a custom list
              </option>
            </Select>
            {/* <section
              className={participants === "selected" ? "block" : "hidden"}
            >
              <h3 className="m-5 font-semibold">Select from List : </h3>
              <List spacing={2} className="max-h-60 overflow-auto">
                <ListItem>
                  <ListIcon as={BsCheckCircle} color="blue.500" />
                  Lorem, ipsum
                </ListItem>
                <ListItem>
                  <ListIcon as={BsCheckCircle} color="blue.500" />
                  Assumenda, quia
                </ListItem>
              </List>
            </section> */}
            <div className={participants === "custom" ? "block" : "hidden"}>
              <Input
                className="mt-6 flex w-80"
                variant="flushed"
                placeholder="Paste comma seperated Emails list"
                value={customList}
                onChange={(e) => setCustomList(e.target.value)}
              />
            </div>

            <div className="flex justify-around mt-8 items-center">
              <Button
                leftIcon={<BsCaretLeftFill />}
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                  setActiveStep(2);
                }}
              >
                Previous
              </Button>
              <Center height="30px">
                <Divider orientation="vertical" />
              </Center>
              <Button
                rightIcon={<BsCaretRightFill />}
                colorScheme="blue"
                variant="outline"
                onClick={handleCreateSession}
              >
                Create
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Schedule;
