import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type room = {
  id: string;
  name: string;
  dp: string;
  title: string;
};

interface LiveListProps {
  classid: string | string[];
  liveRooms: [room] | null;
}

const LiveList = ({ classid, liveRooms }: LiveListProps) => {
  const router = useRouter();
  const [filteredRooms, setFilteredRooms] = useState<room[]>([]);

  useEffect(() => {
    if (liveRooms) {
      const valid = liveRooms.filter((room: room) => {
        return room && room.name != "invalid";
      });
      setFilteredRooms(valid);
    }
  }, [liveRooms]);

  const handleJoinSession = (id: string) => {
    router.push(`/class/${id}`);
  };

  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {filteredRooms && filteredRooms.length > 0 ? (
            filteredRooms.map((result, index) => {
              return (
                <Flex key={index}>
                  <Avatar src={result.dp} />
                  <Box ml="3">
                    <Text fontWeight="bold">
                      {result.name}
                      {result.id != classid && (
                        <Button
                          colorScheme="teal"
                          size="xs"
                          marginLeft={4}
                          onClick={() => handleJoinSession(result.id)}
                        >
                          Join
                        </Button>
                      )}
                    </Text>
                    <Text fontSize="sm">{result.title}</Text>
                  </Box>
                </Flex>
              );
            })
          ) : (
            <Flex>
              <Box ml="3">
                <Text fontWeight="bold">No Live Rooms Available</Text>
                <Text fontSize="sm">Loading...</Text>
              </Box>
            </Flex>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default LiveList;
