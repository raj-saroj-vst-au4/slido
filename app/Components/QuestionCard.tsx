import { Avatar, AvatarGroup, Button, Image } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";

interface questions {
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

interface questioncardProps {
  qrecords: questions[];
}

const QuestionCard = ({ qrecords }: questioncardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<questions>();
  const [previousQuestions, setPreviousQuestions] = useState<questions[]>([]);

  const sortMessages = (msgList: questions[]) => {
    return [...msgList].sort((a, b) => b.upvotes.length - a.upvotes.length);
  };

  const handleNextQuestion = () => {
    if (currentQuestion) {
      setPreviousQuestions((old) => {
        return [...old, currentQuestion];
      });
    }
    console.log(qrecords);
    const sortedmsgs = sortMessages(qrecords);
    const newQuestion = sortedmsgs.find((msg) => !msg.answered);
    if (newQuestion) {
      setCurrentQuestion(newQuestion);
    }
  };
  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg p-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <figure className="max-w-screen-md mx-auto">
          <blockquote>
            <div className="text-2xl font-medium text-white">
              {currentQuestion?.text ||
                "Highly Upvoted Questions would appear here !"}
            </div>
          </blockquote>
          <div className="flex justify-between items-center">
            <Button leftIcon={<FcPrevious />} variant="outline">
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
