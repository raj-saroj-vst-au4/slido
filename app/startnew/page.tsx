"use client";
import {
  Avatar,
  HStack,
  Input,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import ActionMenu from "../Components/ActionMenu";

function StartSessModal() {
  const toast = useToast();
  const { session } = useSession();
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const router = useRouter();

  const handleCreateSession = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}createSession`, {
        title,
        pin,
        dateTime: new Date(),
        participants: "open",
        customList: "",
        user: session?.publicUserData,
        tag,
        desc,
      })
      .then((result) => {
        toast({
          title: "Session Created, Redirecting...",
          description: `Starting a session by ${result.data.name}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          router.push(`/host/${result.data._id}`);
        }, 3200);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Invalid Input",
          description: `${error.response.data}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <div>
      <ActionMenu />
      <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-800 dark:text-gray-100">
        <div className="flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold leadi lg:text-5xl">Lets talk!</h2>
            <div className="dark:text-gray-400">Start New Q&A Session</div>
          </div>
          <img src="/start.svg" alt="" className="p-6 h-100" />
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-center mb-3">
              Session Topic
            </h2>
            <Input
              variant="filled"
              placeholder="ex:- Javascript Hoisting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
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
          </div>
          <div>
            <h3 className="text-2xl font-bold text-center mb-3">
              Short Category Tag
            </h3>
            <div className="text-center">
              <Input
                variant="filled"
                placeholder="ex:- TRPC"
                width={40}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-center mb-3">
              Session Description
            </h3>
            <textarea
              id="message"
              className="w-full p-3 rounded dark:bg-gray-800"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <button
            onClick={handleCreateSession}
            className="w-full p-3 text-sm font-bold tracki uppercase rounded dark:bg-violet-400 dark:text-gray-900"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartSessModal;
