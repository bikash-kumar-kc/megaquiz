import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Container } from "..";
import { useSelector } from "react-redux";
import image from "../../assets/hero-image.png";
import { useNavigate } from "react-router";
import { Footer } from "..";

const Home = () => {
  const authStatus = useSelector((state) => state.userAuth.status);
  console.log(image);
  const userData = useSelector((state) => state.userAuth.userData);

  const navigate = useNavigate();

  const button = [
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
      background: false,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
      background: true,
    },
    {
      name: "Profile",
      path: "/profile",
      active: authStatus,
      background: false,
    },
    {
      name: "quiz",
      path: "/quizoption",
      active: authStatus,
      background: true,
    },
  ];

  return (
    <>
      <Container>
        <Box>
          <Box pt="6rem">
            <VStack gap={
             {
              base:"1rem",
              lg:"2rem"
             }
            }>
              <Box>
                <Text fontSize={{
                    base:"2rem",
                    md:"3rem",
                    lg:"4rem"
                  }}
                   textAlign="center" fontWeight={"bold"}>
                  Hey {userData ? userData.name : ""}, Welcome to Quiz Mania
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
                Here, you can play quiz on different category. You can save your
                work , you can track your progress.
              </Heading>
              <Text fontSize={{
                base:"0.8rem",
                lg:"1rem"
              }}>Are you ready to boost your General Knowledge ?</Text>

              <HStack gap="1rem"
              flexDir={{
                base:"column",
                lg:"row"
              }}
              >
                {button.map(
                  (each) =>
                    each.active && (
                      <Button
                        key={each.name}
                        onClick={() => navigate(each.path)}
                        background={each.background ? "green" : "inherit"}
                        color={each.background ? "white" : "black"}
                        border="1px solid black"
                      >
                        {each.name}
                      </Button>
                    )
                )}
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
