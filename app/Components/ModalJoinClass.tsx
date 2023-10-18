"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const ModalJoinClass = ({ isOpen, onClose }: any) => {
  const [classid, setclassid] = useState();
  const [validating, setValidating] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const handleInputChange = (event: any) => {
    setclassid(event.target.value);
  };

  //   validate from backend pending
  const handleJoinClass = () => {
    setValidating(true);

    //pending also check for validity
    if (!classid) {
      toast({
        title: "Class ID is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setValidating(false);
    } else {
      toast({
        title: "Valid classid, Joining class...",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        setValidating(false);
        router.push(`/class/${classid}`);
      }, 2000);
    }
  };
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
      <ModalContent>
        <ModalHeader>Join Classroom</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Enter the session ID "
            value={classid}
            onChange={(e) => handleInputChange(e)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={validating}
            rightIcon={<AiOutlineArrowRight />}
            colorScheme="blue"
            mr={3}
            variant="outline"
            onClick={handleJoinClass}
          >
            Validate & Join
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalJoinClass;
