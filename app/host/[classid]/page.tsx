"use client";

import Chatbox from "@/app/Components/Chatbox";
import ChoirView from "@/app/Components/ChoirView";
import LiveList from "@/app/Components/LiveList";
import { useToast, CircularProgress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "next/navigation";
import { useAuth, useSession } from "@clerk/nextjs";
import ActionMenu from "@/app/Components/ActionMenu";
import MeetingControls from "@/app/Components/MeetingControls";
import QuestionCard from "@/app/Components/QuestionCard";

export default function host() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [liveRooms, setLiveRooms] = useState(null);
  const { classid } = useParams();
  const { userId, getToken } = useAuth();
  const { session } = useSession();
  const toast = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();

        setSocket(
          io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
            auth: {
              userId,
              token,
            },
          })
        );
        return () => socket?.disconnect;
      } catch (e) {
        console.log("error fetching token", e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket?.on("me", () => {
      setSocket(socket);
      socket?.emit("joinclass", classid);
      toast({
        title: "Joined Session",
        description: `Authenticated for session ${classid}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });

    const handleliverooms = (data: any) => {
      setLiveRooms(data);
    };

    socket?.on("liverooms", handleliverooms);
    return () => {
      socket?.off("liverooms");
    };
  }, [socket]);
  return (
    <main className="flex justify-between h-full">
      {socket && (
        <div className="hidden w-80 lg:block">
          <h2 className="font-bold p-4 text-white">Live Sessions</h2>
          <section className="text-white overflow-auto h-[75vh]">
            <LiveList classid={classid} liveRooms={liveRooms} />
          </section>
        </div>
      )}

      {socket ? (
        <div className="flex flex-col justify-around items-center">
          <div className="w-[35vw]">
            <QuestionCard />
          </div>
          <section className="hidden xl:block hover:shadow-2xl hover:rounded-full">
            <ChoirView />
          </section>
          <MeetingControls />
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center absolute">
          <CircularProgress isIndeterminate />
        </div>
      )}

      <div className="flex flex-col col-span-1 text-gray-800 pb-4 h-[95vh] w-[25vw]">
        {socket && (
          <div className="flex flex-col h-full">
            <ActionMenu />
            <Chatbox
              socket={socket}
              classid={classid}
              session={session}
              variant="host"
            />
          </div>
        )}
      </div>
    </main>
  );
}
