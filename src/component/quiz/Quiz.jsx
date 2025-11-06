import React, { useEffect } from "react";

import { Container, QuizOptions } from "..";
import { Box, Center, Spinner } from "@chakra-ui/react";

const Quiz = () => {
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
            <QuizOptions />
          </Box>
        </Center>
      </Container>
    </>
  );
};

export default Quiz;
