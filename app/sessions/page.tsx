"use client";
import ActionMenu from "../Components/ActionMenu";
import ClassCard from "../Components/ClassCard";
import {
  CircularProgress,
  Divider,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { BsHouseAdd } from "react-icons/bs";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "@clerk/nextjs";

const categories = [
  { title: "TRPC", icon: BsHouseAdd },
  { title: "REACT", icon: BsHouseAdd },
  { title: "MonoRepos", icon: BsHouseAdd },
  { title: "NextJs", icon: BsHouseAdd },
  { title: "PRISMA", icon: BsHouseAdd },
  { title: "MONGODB", icon: BsHouseAdd },
];

type rooms = {
  email: string;
  desc: string;
  image: string;
  name: string;
  title: string;
  tag: string;
  type: string;
  _id: string;
};

const ClassroomsPage = () => {
  const { session } = useSession();
  const [rooms, setRooms] = useState<rooms[]>([]);

  useEffect(() => {
    if (session) {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}fetchmySessions`, {
          mailid: session.publicUserData.identifier,
        })
        .then((result) => {
          setRooms(result.data);
          return console.log(result.data);
        })
        .catch((err) => {
          return console.log(err);
        });
    }
  }, [session]);
  return (
    <>
      <ActionMenu />
      <section className="flex justify-between">
        <h2 className="text-white text-2xl ml-4 mb-3 font-bold">
          Upcoming Open Sessions
        </h2>
        <HStack spacing={4}>
          <h5 className="text-white font-bold">Categories :</h5>
          {categories.map((category) => {
            return (
              <Tag
                size="md"
                variant="subtle"
                key={category.title}
                colorScheme="cyan"
              >
                <TagLeftIcon as={category.icon} />
                <TagLabel>{category.title}</TagLabel>
              </Tag>
            );
          })}
        </HStack>
      </section>

      <Divider />
      {rooms ? (
        <section className="flex overflow-x-auto">
          {rooms
            .filter((s) => s.type === "open")
            .map((record) => (
              <ClassCard
                creatorname={record.name}
                key={record._id}
                title={record.title}
                tag={record.tag}
                desc={record.desc}
                id={record._id}
                creatorimg={record.image}
              />
            ))}
        </section>
      ) : (
        <h3 className="text-white text-xl font-bold">
          No Open Sessions Found...
        </h3>
      )}

      <Divider />
      <h2 className="text-white text-2xl ml-4 mt-4 font-bold">
        Subscibed Sessions
      </h2>
      <Divider />
      {rooms ? (
        <section className="flex overflow-x-auto">
          {rooms
            .filter((s) => s.type === "custom")
            .map((record) => (
              <ClassCard
                creatorname={record.name}
                key={record._id}
                title={record.title}
                tag={record.tag}
                desc={record.desc}
                id={record._id}
                creatorimg={record.image}
              />
            ))}
        </section>
      ) : (
        <h3 className="text-white text-xl font-bold">
          No Open Sessions Found...
        </h3>
      )}
    </>
  );
};

export default ClassroomsPage;
