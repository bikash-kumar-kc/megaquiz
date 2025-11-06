import React, { useEffect } from "react";
import { Container, Input, Select } from ".";
import { Center, Heading, Box, Text, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetStore, userRequirement } from "../store/questionRecord";
import { useNavigate } from "react-router";

const QuizOptions = () => {
  const userData = useSelector((store) => store.userAuth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const categories = [
    { label: "General Knowledge", value: "9" },
    { label: "Entertainment: Books", value: "10" },
    { label: "Entertainment: Film", value: "11" },
    { label: "Entertainment: Music", value: "12" },
    { label: "Entertainment: Musicals & Theatres", value: "13" },
    { label: "Entertainment: Television", value: "14" },
    { label: "Entertainment: Video Games", value: "15" },
    { label: "Entertainment: Board Games", value: "16" },
    { label: "Science & Nature", value: "17" },
    { label: "Science: Computers", value: "18" },
    { label: "Science: Mathematics", value: "19" },
    { label: "Mythology", value: "20" },
    { label: "Sports", value: "21" },
    { label: "Geography", value: "22" },
    { label: "History", value: "23" },
    { label: "Politics", value: "24" },
    { label: "Art", value: "25" },
    { label: "Celebrities", value: "26" },
    { label: "Animals", value: "27" },
    { label: "Vehicles", value: "28" },
    { label: "Entertainment: Comics", value: "29" },
    { label: "Science: Gadgets", value: "30" },
    { label: "Entertainment: Japanese Anime & Manga", value: "31" },
    { label: "Entertainment: Cartoon & Animations", value: "32" },
  ];

  const difficulties = ["easy", "medium", "hard"];

  const onsubmit = (data) => {
    console.log(data);
    dispatch(
      userRequirement({
        totalquestions: data.totalquestions,
        categoryCode: data.category,
        difficultyMode: data.difficulty,
      })
    );
    navigate("/quizplay");
  };

  useEffect(() => {
    dispatch(resetStore());
  }, []);

  return (
    <Container>
      <Center minH={"80vh"}>
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap="2rem"
        >
          <Box as="div">
            <Text fontSize={{
                    base:"2rem",
                    md:"3rem",
                    lg:"4rem"
                  }} textAlign="center" fontWeight={"bold"}>
              Hey {userData ? userData.name : ""}, Explore this...
            </Text>
          </Box>

          <Heading
            textAlign={"center"}
            as="h3"
            fontSize={{
                  base:"0.7rem",
                  lg:"1.2rem"
                }}
            fontWeight={"400"}
            color={"gray"}
            width={"50%"}
          >
            Here you can choose in which category, in which difficulty mode ,
            and you can manually set questions.
          </Heading>

          <Box>
            <form
              id="form"
              onSubmit={handleSubmit(onsubmit)}
              className="flex flex-col justify-center items-center bg-gray-100  "
            >
              <Box
                p="1rem"
                border={"1px solid black"}
                borderRadius={"10px"}
                display={"flex"}
                flexDir={"column"}
                gap="1rem"
                width={{
                  base:"300px",
                  md:"400px",
                  lg:"600px"

                }}
              >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                  Quiz Settings
                </h2>

                <Input
                  label="Total Questions :"
                  className="mb-4"
                  type="number"
                  min="1"
                  max="21"
                  {...register("totalquestions", { required: true })}
                />

                <Select
                  category
                  options={categories}
                  label="Category"
                  className="mb-4"
                  {...register("category", { required: true })}
                />

                <Select
                  options={difficulties}
                  label="Difficulty"
                  className="mb-4"
                  {...register("difficulty", { required: true })}
                />
                <Button
                  type="submit"
                  mt="1rem"
                  bg="green"
                  _hover={{
                    bg: "green.400",
                  }}
                >
                  Start Quiz
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Center>
    </Container>
  );
};

export default QuizOptions;
