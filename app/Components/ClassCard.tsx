"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Image,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import { useRouter } from "next/navigation";
interface classcardProps {
  creatorname: string;
  id: string;
  title: string;
  tag: string;
  desc: string;
  creatorimg: string;
}

export default function ClassCard({
  creatorname,
  id,
  title,
  tag,
  desc,
  creatorimg,
}: classcardProps) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const handleJoin = (url: string) => {
    router.push(`/class/${url}`);
  };

  return (
    <Center py={2}>
      <Box
        w="xs"
        rounded={"sm"}
        my={2}
        mx={[0, 3]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <Box h={"120px"} p={"8px"} borderBottom={"1px"} borderColor="black">
          <Image
            borderRadius="full"
            boxSize="80px"
            src={creatorimg}
            alt={creatorname}
          />
        </Box>
        <Box p={2}>
          <Box
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {tag || "Generic"}
            </Text>
          </Box>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {title}
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            {desc || "Live Q&A"}
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
            onClick={() => handleJoin(id)}
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Join Session
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <BsHeartFill fill="red" fontSize={"24px"} />
            ) : (
              <BsHeart fontSize={"24px"} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
