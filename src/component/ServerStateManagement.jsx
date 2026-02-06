import { Box, Card, Center, Container, Text, Image } from "@chakra-ui/react";
import React from "react";

const ServerStateManagement = ({ image, message,userName }) => {
  return (
    <Container>
      <Center minH="80vh" mt="2rem">
        <Box display={"flex"} p="1rem" boxShadow="md">
          <Box>
            <Image
              src={image}
              boxSize={{
                base: "300px",
                lg: "500px",
              }}
              display={{
            base:"none",
            lg:"block"
          }}
              alt="login_image"
              objectFit="cover"
            />
          </Box>
          <Card.Root
            w={{
              base:"256px",
              md:"356px",
              lg:"456px"
            }}
            display={"flex"}
            borderRadius={"0"}
            p={6}
            flexDir={"column"}
            gap="2rem"
            justifyContent={"center"}
          >
            <Box display={"flex"} flexDir={"column"} gap="1rem">
              <Box>
                <Text
                  textAlign={"center"}
                  fontSize={{
                    base:"2rem",
                    md:"3rem",
                    lg:"4rem"
                  }}
                  fontWeight={"bold"}
                >
                 {userName || "user"}
                </Text>
              </Box>
              <Box>
                <Text
                  color="blackAlpha.500"
                  mt="4"
                  fontSize={"14px"}
                  textAlign={"center"}
                >
                  {message}
                </Text>
              </Box>
            </Box>
          </Card.Root>
        </Box>
      </Center>
    </Container>
  );
};

export default ServerStateManagement;
