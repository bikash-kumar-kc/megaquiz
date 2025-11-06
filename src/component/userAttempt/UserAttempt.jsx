import React, { useEffect, useState } from "react";
import { Container } from "..";
import { Box, Button, Card, Center, Heading, Text } from "@chakra-ui/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import databaseservices from "../../appwrite/database";
import { toast } from "react-toastify";
import { updateUserRecord } from "../../store/userAttemptSlice";

const UserAttempt = () => {
  const dispatch = useDispatch();
  const [userId, setuserId] = useState();
  const navigate = useNavigate();

  const userresponse = useSelector(
    (store) => store.userresponse.userResponse,
    shallowEqual
  );

  const correctanswer = useSelector(
    (store) => store.userresponse.correctResponse,
    shallowEqual
  );

  const userData = useSelector((state) => state.userAuth.userData);

  const questions = useSelector((store) => store.question.question);

  const [index, setIndex] = useState(0);

  let gamePlayed = "1";

  const record = useSelector((store) => store.userrecord.userData);

  const isrecord = useSelector((store) => store.userrecord.isRecord);

  const { mutate } = useMutation({
    mutationKey: ["user-Data"],
    mutationFn: databaseservices.gettingaRecord,
    onSuccess: (userData) => {
      if (userData) {
        dispatch(updateUserRecord(userData));
      }
      toast("getting a user record");
    },
    onError: (error) => {
      toast("error in getting record");
      console.log(error);
    },
  });

  const nextquestion = () => {
    if (index < questions.length - 1) {
      setIndex((prevs) => Number(prevs) + 1);
    } else {
      const questionUnattempt = userresponse.filter(
        (each) => each === "not attempted"
      );

      let correctAttempt = 0;

      for (let i = 0; i < userresponse.length; i++) {
        if (userresponse[i] === correctanswer[i]) {
          correctAttempt++;
        }
      }

      let wrongAttempt = String(userresponse.length - correctAttempt);
      let unattempt = String(questionUnattempt.length);
      let questionAttempt = String(userresponse.length);

      if (isrecord) {
        gamePlayed = String(Number(record.gamePlayed) + 1);
        correctAttempt = String(
          Number(record.correctAttempt) + Number(correctAttempt)
        );
        wrongAttempt = String(
          Number(record.wrongAttempt) + Number(wrongAttempt)
        );
        unattempt = String(Number(record.unattempt) + Number(unattempt));
        questionAttempt = String(
          Number(record.questionAttempt) + Number(userresponse.length)
        );

        updatingrecord({
          userId,
          gamePlayed,
          correctAttempt,
          wrongAttempt,
          questionAttempt,
          unattempt,
        });
      } else {
        userRecord({
          gamePlayed,
          wrongAttempt,
          unattempt,
          correctAttempt: String(correctAttempt),
          userId,
          questionAttempt,
        });
      }

      navigate("/profile");
    }
  };

  const beforequestion = () => {
    setIndex((prevs) => Number(prevs) - 1);
  };

  const { mutate: userRecord } = useMutation({
    mutationKey: ["USER-RECORD"],
    mutationFn: databaseservices.creatingRecord,
    onSuccess: (data) => {
      if (data) {
        mutate(userId);
      }
      console.log("user record listed...");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: updatingrecord } = useMutation({
    mutationKey: ["UPDATE-RECORD"],
    mutationFn: databaseservices.updatingrecord,
    onSuccess: (data) => {
      if (data) {
        mutate(userId);
      }
      toast("updating successfully...");
    },
    onError: (error) => {
      console.log(error);
      toast("problem in updating record");
    },
  });

  console.log(questions);

  const options = [
    questions[index].opt1,
    questions[index].opt2,
    questions[index].opt3,
    questions[index].opt4,
  ];

  useEffect(() => {
    if (userData) {
      setuserId(userData.$id);
    }
  }, [userData]);

 if (!questions || questions.length === 0) {
  return <ServerStateManagement message="No questions available" />;
}

    return (
      <Container>
        <Center min="80vh">
          <Box>
            <Box mt="4rem">
              <Text
                fontSize={{
                  base: "2rem",
                  md: "3rem",
                  lg: "4rem",
                }}
                textAlign="center"
                fontWeight={"bold"}
              >
                Hey {userData ? userData.name : ""}, here is your attempt...
              </Text>
            </Box>
            <Box
              m={{
                base: "1rem",
                lg: "4rem",
              }}
            >
              <Card.Root
                p="2rem"
                display={"flex"}
                flexDir={"column"}
                gap="2rem"
              >
                <Heading>
                  {index + 1}. {questions[index].question}
                </Heading>
                <Box as="ul" display={"flex"} flexDir={"column"} gap="1rem">
                  {options.map((opt, i) => (
                    <Box
                      key={i}
                      as="li"
                      listStyle="none"
                      border="1px solid black"
                      borderRadius="5px"
                      px="1rem"
                      py="0.5rem"
                      bg={
                        userresponse[index] === opt
                          ? correctanswer[index] === userresponse[index]
                            ? "green.500"
                            : "red"
                          : correctanswer[index] === opt
                          ? "green.500"
                          : "white"
                      }
                    >
                      {i + 1}. {opt}
                    </Box>
                  ))}
                </Box>
                <Box display={"flex"} gap="2rem" justifyContent={"center"}>
                  {index > 0 && (
                    <Button
                      w="100px"
                      bg="white"
                      border="1px solid black"
                      color="black"
                      onClick={beforequestion}
                    >
                      Before
                    </Button>
                  )}
                  <Button
                    alignSelf={"center"}
                    w="100px"
                    bg="purple"
                    _hover={{ bg: "purple.500" }}
                    onClick={nextquestion}
                  >
                    {index < questions.length - 1 ? "Next" : "Stat"}
                  </Button>
                </Box>
              </Card.Root>
            </Box>
          </Box>
        </Center>
      </Container>
    );
};

export default UserAttempt;
