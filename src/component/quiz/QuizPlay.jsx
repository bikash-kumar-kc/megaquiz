import { Box, Card, Center, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Container, QuestionCard, ServerStateManagement } from "..";
import { getQuestions } from "../../store/questionSlice";
import { useDispatch, useSelector,shallowEqual } from "react-redux";
import imgaewaiting from "../../assets/waiting.svg";
import imageerror from "../../assets/error.svg";
import imagevisit from "../../assets/visit.svg";

const QuizPlay = () => {
  const dispatch = useDispatch();

  const isuserRequirement = useSelector(
    (store) => store.userrequirement.isupdate,shallowEqual
  );

  const totalquestions = useSelector(
    (store) => store.userrequirement.totalquestions,shallowEqual
  );
  const categoryCode = useSelector(
    (store) => store.userrequirement.categoryCode,shallowEqual
  );
  const difficultyMode = useSelector(
    (store) => store.userrequirement.difficultyMode,shallowEqual
  );

  // if (isuserRequirement) {
  useEffect(() => {
    dispatch(getQuestions({ totalquestions, categoryCode, difficultyMode }));
  }, [isuserRequirement, totalquestions, categoryCode, difficultyMode]);
  // }

  const questionStatus = useSelector((store) => store.question.status);
  console.log(questionStatus);
  const question = useSelector((store) => store.question.question);
  console.log(question);

  if (questionStatus === "loading") {
    return (
      <ServerStateManagement
        image={imgaewaiting}
        message={"Questions are being fetched. Wait till"}
      />
    );
  } else if (questionStatus === "false") {
    return (
      <ServerStateManagement image={imageerror} message={"we got an error."} />
    );
  } else if (questionStatus === "idle") {
    return (
      <ServerStateManagement
        image={imagevisit}
        message={"visit quiz page and select your requirement."}
      />
    );
  } else
    return (
      <>
        <Container>
          <Center minH={"80vh"}>
            <Box
              display={"flex"}
              flexDir={"column"}
              gap="1rem"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box as="div">
                <Text
                  fontSize={{
                    base: "2rem",
                    md: "3rem",
                    lg: "4rem",
                  }}
                  textAlign="center"
                  fontWeight={"bold"}
                >
                  Hey bikash, Enjoy the quiz
                </Text>
              </Box>
              <Box as="div">
                <QuestionCard questions={question} />
              </Box>
            </Box>
          </Center>
        </Container>
      </>
    );
};

export default QuizPlay;
