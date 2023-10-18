"use client";
import ActionMenu from "../Components/ActionMenu";
import ClassCard from "../Components/ClassCard";
import { Divider, HStack, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { BsHouseAdd } from "react-icons/bs";

import React from "react";

const categories = [
  { title: "TRPC", icon: BsHouseAdd },
  { title: "REACT", icon: BsHouseAdd },
  { title: "MonoRepos", icon: BsHouseAdd },
  { title: "NextJs", icon: BsHouseAdd },
  { title: "PRISMA", icon: BsHouseAdd },
  { title: "MONGODB", icon: BsHouseAdd },
];

const ClassroomsPage = () => {
  return (
    <>
      <ActionMenu />
      <section className="flex justify-between">
        <h2 className="text-white text-2xl ml-4 mb-3 font-bold">
          Upcoming Sessions
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
      <section className="flex overflow-x-auto">
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
      </section>
      <Divider />
      <h2 className="text-white text-2xl ml-4 mt-4 font-bold">
        Subscibed Sessions
      </h2>
      <Divider />
      <section className="flex overflow-x-auto">
        <ClassCard />
        <ClassCard />
      </section>
    </>
  );
};

export default ClassroomsPage;
