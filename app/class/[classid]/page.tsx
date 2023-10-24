"use client";

import Chatbox from "@/app/Components/Chatbox";
import ChoirView from "@/app/Components/ChoirView";
import LiveList from "@/app/Components/LiveList";
import { useToast, CircularProgress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams, useRouter } from "next/navigation";
import { useAuth, useSession } from "@clerk/nextjs";
import ActionMenu from "@/app/Components/ActionMenu";
import axios from "axios";

export default function Class() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [liveRooms, setLiveRooms] = useState(null);
  const [status, setStatus] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const { classid } = useParams();
  const { userId, getToken } = useAuth();
  const { session } = useSession();
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        return setSocket(
          io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
            auth: {
              userId,
              token,
            },
          })
        );
        // return () => socket?.disconnect;
      } catch (e) {
        console.log("error fetching token", e);
      }
    };
    const checkRoomExists = () => {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}checkIsHost`, {
          mailid: session?.user.primaryEmailAddress?.emailAddress,
          classid,
        })
        .then((result) => {
          if (result.status == 201) {
            setIsHost(true);
            return toast({
              title: "Authenticated Host",
              description: `Host session ${result.data.title}`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else if (result.status == 203) {
            return toast({
              title: "Authenticated User",
              description: `Joined session ${result.data.title}`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch((e) => {
          console.log(e);
          toast({
            title: "Invalid URL, Redirecting back...",
            description: `The Session URL is either expired or invalid`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setTimeout(() => {
            router.push(`/sessions`);
          }, 3200);
        });
    };
    fetchData();
    checkRoomExists();
  }, []);

  useEffect(() => {
    socket?.on("me", (id: string) => {
      setSocket(socket);
      socket?.emit("joinclass", classid);
      setStatus(true);
    });

    const handleliverooms = (data: any) => {
      setLiveRooms(data);
    };

    const handleDisconnect = () => {
      setStatus(false);
    };
    socket?.on("liverooms", handleliverooms);
    socket?.on("disconnect", handleDisconnect);
    return () => {
      socket?.off("liverooms");
      socket?.off("disconnect");
    };
  }, [socket]);

  const handleLeave = () => {
    socket?.disconnect();
    toast({
      title: "Gracefully Leaving !",
      description: `Redirection in process, please wait...`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      router.push("/sessions");
    }, 3200);
  };

  const handleSwitchHost = () => {
    router.push(`/host/${classid}`);
  };
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
        <div className="flex flex-col w-[75rem] pt-6">
          <Chatbox
            socket={socket}
            classid={classid}
            session={session}
            variant="participant"
          />
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <CircularProgress isIndeterminate />
        </div>
      )}

      <div className="hidden md:block flex flex-col col-span-1 text-gray-800 pt-2 pr-4 pb-4">
        {socket && (
          <div>
            <ActionMenu />

            <div className="flex mt-8 justify-center items-center">
              <h3 className="text-white">Live Status </h3>
              <span className="relative flex h-3 w-3 ml-4">
                {status ? (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-800 " />
                ) : (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                )}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              {isHost && (
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-8"
                  onClick={handleSwitchHost}
                >
                  Switch to Host
                </button>
              )}
            </div>

            <section className="mt-48 right-5 hover:shadow-2xl hover:rounded-full">
              <ChoirView />
            </section>

            <div className="flex justify-between px-1 pt-2 border-2 border-indigo-500/75 rounded-3xl mt-12">
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Video
              </button>
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={handleLeave}
              >
                Leave
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
