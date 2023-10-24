import { Avatar, AvatarGroup, Button, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";

interface User {
  ufname: string;
  uimage: string;
  umailid: string;
}

interface Question {
  from: User;
  text: string;
  time: Date;
  msgid: string;
  upvotes: Array<{ sm: string; si: string }>;
  answered: number;
}

interface QuestionCardProps {
  socket: {
    on(event: string, callback: (data: any) => void): void;
    off(event: string): void;
    emit(event: string, data: any): void;
  };
  qrecords: Question[];
  classid: string | string[];
}

const QuestionCard = ({ socket, qrecords, classid }: QuestionCardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(
    undefined
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [qCounter, setQCounter] = useState<number>(0);
  const isOldRecordsSet = useRef(false);

  const sortAnsMessages = (msgslist: Question[]) => {
    const sortedPrevAnswered = msgslist
      .filter((q) => q.answered)
      .sort((a, b) => a.answered - b.answered);
    if (sortedPrevAnswered.length > 0) {
      setAnsweredQuestions(sortedPrevAnswered);
      setQCounter(sortedPrevAnswered[0].answered);
    }
  };

  useEffect(() => {
    if (qrecords.length > 0 && !isOldRecordsSet.current) {
      sortAnsMessages(qrecords);
      isOldRecordsSet.current = true;
    }
  }, [qrecords]);

  const sortUpvotedMessages = (msgList: Question[]) => {
    return msgList.slice().sort((a, b) => b.upvotes.length - a.upvotes.length);
  };

  const handleNextQuestion = () => {
    if (qCounter < answeredQuestions.length) {
      setCurrentQuestion(answeredQuestions[qCounter]);
      setQCounter((prev) => prev + 1);
    } else {
      const sortedmsgs = sortUpvotedMessages(qrecords);
      const newQuestion = sortedmsgs.find((msg) => !msg.answered);
      if (newQuestion) {
        setQCounter((prev) => prev + 1);
        newQuestion.answered = qCounter;
        setAnsweredQuestions((answered) =>
          [...answered, newQuestion].sort((a, b) => a.answered - b.answered)
        );

        setCurrentQuestion(newQuestion);
        console.log(
          "answered questions before taking a new one",
          answeredQuestions
        );
        socket.emit("flagAnswered", {
          ansmsgid: newQuestion.msgid,
          classid,
          ansindex: qCounter,
        });
      } else {
        setCurrentQuestion({
          from: {
            ufname: "Team Queryflow",
            uimage: "https://bit.ly/dan-abramov",
            umailid: "system",
          },
          text: "Awaiting New questions",
          time: new Date(1697873422454),
          msgid: "none",
          upvotes: [],
          answered: 450000,
        });
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (answeredQuestions.length > 0) {
      const previousIndex = qCounter - 1;
      if (previousIndex >= 0 && answeredQuestions[previousIndex]) {
        setCurrentQuestion(answeredQuestions[previousIndex]);
        setQCounter(previousIndex);
      } else if (previousIndex == -1) {
        setCurrentQuestion({
          from: {
            ufname: "Team Queryflow",
            uimage: "https://bit.ly/dan-abramov",
            umailid: "system",
          },
          text: "No more older questions",
          time: new Date(1697873422454),
          msgid: "none",
          upvotes: [],
          answered: 450000,
        });
      }
    }
  };

  return (
    <section className="bg-gray-900 rounded-lg p-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <figure className="max-w-screen-md mx-auto">
          <blockquote>
            <div className="text-2xl font-medium text-white">
              {currentQuestion?.text ||
                "Highly Upvoted Questions would appear here!"}
            </div>
          </blockquote>
          <div className="flex justify-between items-center">
            <Button
              leftIcon={<FcPrevious />}
              variant="outline"
              onClick={handlePreviousQuestion}
            >
              Previous
            </Button>
            <figcaption className="flex items-center justify-center mt-6 mb-4 space-x-3">
              <Image
                borderRadius="full"
                boxSize="40px"
                src={
                  currentQuestion?.from.uimage || "https://bit.ly/dan-abramov"
                }
                alt="Dan Abramov"
              />{" "}
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-gray-900 dark:text-white">
                  {currentQuestion?.from.ufname}
                </div>
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  <AvatarGroup size="sm" max={3}>
                    {currentQuestion?.upvotes?.map((voter, index) => (
                      <Avatar key={index} name={voter.sm} src={voter.si} />
                    ))}
                  </AvatarGroup>
                </div>
              </div>
            </figcaption>
            <Button
              rightIcon={<FcNext />}
              variant="outline"
              onClick={handleNextQuestion}
            >
              Next
            </Button>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default QuestionCard;
