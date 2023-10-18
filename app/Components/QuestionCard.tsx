import { Image } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcNext, FcPrevious } from "react-icons/fc";

const QuestionCard = () => {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg p-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <figure className="max-w-screen-md mx-auto">
          <blockquote>
            <div className="text-2xl font-medium text-white">
              "Flowbite is just awesome. It contains tons of predesigned
              components and pages starting from login screen to complex
              dashboard. Perfect choice for your next SaaS complex dashboard.
              Perfect choice for your next SaaS application." just awesome. It
              contains tons of predesigned components and pages starting from
              login screen to complex dashboard. Perfect choice for your next
              SaaS application.""Flowbite is just awesome. It contains tons of
              predesigned components and pages starting from login screen to
              complex dashboard. Perfect choice for your next SaaS application."
            </div>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <Image
              borderRadius="full"
              boxSize="40px"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />{" "}
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-medium text-gray-900 dark:text-white">
                Micheal Gough
              </div>
              <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                & 8 others
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
export default QuestionCard;
