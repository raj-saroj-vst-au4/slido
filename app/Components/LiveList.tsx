import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

interface LiveListProps {
  classid: string | string[];
  liveRooms: [{ id: string; name: string; dp: string; title: string }] | null;
}

const LiveList = ({ classid, liveRooms }: LiveListProps) => {
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
                        <Badge ml="1" colorScheme="green">
                          Join
                        </Badge>
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
