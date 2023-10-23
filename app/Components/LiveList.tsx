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

interface LiveListProps {
  classid: string | string[];
  liveRooms: [{ id: string; name: string; dp: string; title: string }] | null;
}

const LiveList = ({ classid, liveRooms }: LiveListProps) => {
  const router = useRouter();

  const handleJoinSession = (id: string) => {
    router.push(`/class/${id}`);
  };

  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {liveRooms && liveRooms.length > 0 ? (
            liveRooms.map((result, index) => {
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
