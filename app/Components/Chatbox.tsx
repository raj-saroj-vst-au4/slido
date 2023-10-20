import {
  Avatar,
  AvatarGroup,
  Button,
  Center,
  Divider,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stat,
  StatGroup,
  StatNumber,
  StatHelpText,
  StatArrow,
  useToast,
} from "@chakra-ui/react";
import { FaLevelUpAlt, FaRegFrownOpen } from "react-icons/fa";
import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";

interface Socket {
  on(event: string, callback: (data: any) => void): void;
  off(event: string): void;
  emit(event: string, data: any): void;
}

interface ChatboxProps {
  socket: Socket;
  classid: string | string[];
  session:
    | {
        user: {
          firstName: string;
          fullName: string;
          umailid: string;
          imageUrl: string;
          primaryEmailAddress: {
            emailAddress: string;
          };
        };
      }
    | any;
  variant: "host" | "participant";
  setQRecords?: Dispatch<SetStateAction<ChatText[]>>;
}

interface ChatText {
  from: {
    ufname: string;
    uimage: string;
    umailid: string;
  };
  text: string;
  time: Date;
  msgid: string;
  upvotes: Array<{ sm: string; si: string }>;
  answered: Boolean;
}

interface LiveList {
  ufname: string;
  uimage: string;
}

const Chatbox = ({
  socket,
  classid,
  session,
  variant,
  setQRecords,
}: ChatboxProps) => {
  const [myText, setMyText] = useState<any>("");
  const [textRecords, setTextRecords] = useState<ChatText[]>([]);
  const [liveList, setLiveList] = useState<LiveList[]>([]);
  const toast = useToast();

  const checkVoted = (
    mailid: string,
    upvotes: Array<{ sm: string; si: string }>
  ) => {
    let result = upvotes.some((voter: { sm: string }) => {
      return voter.sm == mailid;
    });
    return result;
  };

  useEffect(() => {
    const handleRecMsg = (msg: ChatText) => {
      setTextRecords((prev) => [
        ...prev,
        {
          from: msg.from,
          text: msg.text,
          time: msg.time,
          msgid: msg.msgid,
          upvotes: msg.upvotes,
          answered: msg.answered,
        },
      ]);
    };

    const handleliveList = (list: LiveList[]) => {
      setLiveList(list);
    };

    const handleMessagesList = (msgs: any) => {
      setTextRecords(msgs);
    };

    const handleUpvotedMsg = (data: {
      msgid: string;
      smailid: string;
      simage: string;
    }) => {
      const { msgid, smailid, simage } = data;

      setTextRecords((prevtxts) => {
        const msgindex = prevtxts.findIndex((msg) => msg.msgid === msgid);
        if (msgindex >= 0 && !checkVoted(smailid, prevtxts[msgindex].upvotes)) {
          prevtxts[msgindex].upvotes.push({ sm: smailid, si: simage });
        }
        return [...prevtxts];
      });
    };

    socket.on("livelist", handleliveList);
    socket.on("recMsg", handleRecMsg);
    socket.on("intmsgslist", handleMessagesList);
    socket.on("upvotedmsg", handleUpvotedMsg);

    return () => {
      socket.off("recMsg");
      socket.off("livelist");
      socket.off("intmsgslist");
      socket.off("upvotedmsg");
    };
  }, [socket]);

  const handleMessageSend = (firstName: string) => {
    if (myText.length > 8) {
      if (textRecords.some((msg) => msg.text == myText)) {
        toast({
          title: "Spam Alert",
          description: `Do not Spam ${firstName}, Incident Reported & Msg Discarded`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return setMyText("");
      }
    }

    socket.emit("sendMsg", {
      text: myText,
      classid,
    });

    setMyText("");
  };

  const handleTimeConverter = (time: string | Date) => {
    time = new Date(time);
    const timeDiffMs = Math.abs(new Date().getTime() - time.getTime());
    if (timeDiffMs < 10000) {
      return "Just Now";
    } else if (10000 < timeDiffMs && timeDiffMs < 60000) {
      return `${Math.round(timeDiffMs / 1000)} Secs ago`;
    } else {
      return `${time.getHours()} : ${time.getMinutes()}`;
    }
  };

  const handlesendUpvote = (msgid: string | undefined) => {
    const smailid = session.user.primaryEmailAddress.emailAddress;
    const simage = session.user.imageUrl;
    socket.emit("upmsg", {
      msgid,
      classid,
      smailid,
      simage,
    });
  };

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (textRecords.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  });

  if (variant == "host" && setQRecords) {
    useEffect(() => {
      setQRecords(textRecords.filter((msg) => msg.text.length > 8));
    }, [textRecords]);
  }

  return (
    <div className="flex flex-col grow bg-stone-50 shadow-xl rounded-lg overflow-hidden h-full">
      <div className="bg-gray-300 p-4 flex justify-center items-center">
        <AvatarGroup size="sm" max={20}>
          {liveList.map((user, index) => (
            <Avatar key={index} name={user.ufname} src={user.uimage} />
          ))}
        </AvatarGroup>
        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>
        <span className="font-semibold ml-4">{liveList.length} Online</span>
      </div>
      {session && (
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {!textRecords.length && (
            <div className="flex w-full mt-2 space-x-3 max-w-xs">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
              <div>
                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                  <p className="text-sm">Welcome {session.user.firstName}</p>
                </div>
                <span className="text-xs text-gray-500 leading-none">
                  1 min ago
                </span>
              </div>
            </div>
          )}

          {textRecords.map((msg, index) => {
            return msg.from.umailid ==
              session.user.primaryEmailAddress.emailAddress ? (
              <div
                key={index}
                className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
              >
                <div>
                  <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none">
                    {handleTimeConverter(msg.time)}
                  </span>
                </div>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                  <Image
                    borderRadius="full"
                    boxSize="40px"
                    src={session.user.imageUrl}
                    alt={session.user.fullName}
                  />
                </div>
              </div>
            ) : (
              <div key={index} className="flex w-full mt-2 space-x-3 max-w-sm">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                  <Image
                    borderRadius="full"
                    boxSize="40px"
                    src={msg.from.uimage}
                    alt={msg.from.ufname}
                  />
                </div>
                <div>
                  <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                    <div className="text-sm">
                      {msg.text}
                      <div className="flex justify-end">
                        <div className="bg-gray-300">
                          <AvatarGroup size="sm" max={3}>
                            {msg.upvotes?.map((voter, index) => (
                              <Avatar
                                key={index}
                                name={voter.sm}
                                src={voter.si}
                              />
                            ))}
                          </AvatarGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="flex mt-2 text-xs text-gray-500 leading-none">
                    {msg.from.ufname} {handleTimeConverter(msg.time)}
                  </span>
                </div>
                <StatGroup>
                  {msg.text.length > 8 && (
                    <Stat>
                      {!checkVoted(
                        session.user.primaryEmailAddress.emailAddress,
                        msg.upvotes
                      ) &&
                        variant == "participant" && (
                          <Button
                            leftIcon={<FaLevelUpAlt />}
                            colorScheme="blue"
                            variant="outline"
                            size="xs"
                            onClick={() => handlesendUpvote(msg.msgid)}
                          >
                            Upvote
                          </Button>
                        )}
                      <StatNumber>{msg.upvotes.length}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        {Math.round(
                          (msg.upvotes.length / liveList.length) * 100
                        ) + "%"}
                      </StatHelpText>
                    </Stat>
                  )}
                </StatGroup>
              </div>
            );
          })}
          <div ref={ref} />
        </div>
      )}

      <div className="bg-gray-300 p-4">
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            placeholder="Chat Message..."
            value={myText}
            onChange={(e) => setMyText(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => handleMessageSend(session.user.firstName)}
            >
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
    </div>
  );
};

export default Chatbox;
