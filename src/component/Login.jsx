import React, { use } from "react";
import { Container } from ".";
import {
  Box,
  Card,
  Stack,
  Center,
  Text,
  Input,
  Button,
  Image,
  Field,
} from "@chakra-ui/react";
import image from "../assets/signedUp.svg";
import { Form, Formik, Field as FormikField } from "formik";
import { useMutation } from "@tanstack/react-query";
import { object, string } from "yup";
import authenservice from "../appwrite/authService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";

const validationLogin = object({
  email: string()
    .email("email is not valid")
    .required("this is an required field"),

  password: string()
    .min(8, "password must be 8 character")
    .required("password is required field"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: authenservice.loginUser,
    onSuccess: (data) => {
      if (data) {
        toast("login successfully");
        navigate("/");
      }
    },
    onError: (error) => {
      toast("we got error in login");
      console.log(error);
    },
  });

  return (
    <Container>
      <Center minH="80vh" mt="2rem">
        <Box display={"flex"} boxShadow="md">
          <Box display={{
            base:"none",
            lg:"block"
          }}>
            <Image
              src={image}
              boxSize={{
                base: "300px",
                lg: "500px",
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
            <Box>
              <Box>
                <Text textAlign={"center"}>Welcome to Quiz Mania</Text>
              </Box>
              <Box>
                <Text
                  color="black.60"
                  mt="4"
                  fontSize={"14px"}
                  textAlign={"center"}
                >
                  Enter your credentials to access the account.
                </Text>
              </Box>
            </Box>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values, { resetForm }) => {
                mutate({
                  email: values.email,
                  password: values.password,
                });
                resetForm();
              }}
              validationSchema={validationLogin}
            >
              <Form>
                <Stack display={"flex"} flexDir="column" gap="2rem">
                  <FormikField name="email">
                    {({ field, meta }) => (
                      <Field.Root invalid={!!(meta.touched && meta.error)}>
                        <Field.Label
                          name="email"
                          color="#171717"
                          fontSize="12px"
                        >
                          Email
                        </Field.Label>
                        <Input
                          {...field}
                          name="email"
                          type="email"
                          placeholder="Enter your email..."
                        />
                        <Field.ErrorText>{meta.error}</Field.ErrorText>
                      </Field.Root>
                    )}
                  </FormikField>

                  <FormikField name="password">
                    {({ field, meta }) => (
                      <Field.Root invalid={!!(meta.touched && meta.error)}>
                        <Field.Label color="#171717" fontSize="12px">
                          Password
                        </Field.Label>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          name="password"
                        />
                        <Field.ErrorText>{meta.error}</Field.ErrorText>
                      </Field.Root>
                    )}
                  </FormikField>

                  <Stack>
                    <Box>
                      <Button
                        borderRadius={"1rem"}
                        width={"100%"}
                        textAlign={"center"}
                        p="1rem"
                        bg={"#D8DDE2"}
                        color="#797E82"
                        fontWeight={"400"}
                        fontSize={"0.8rem"}
                        _hover={{
                          background: "gray",
                          color: "white",
                        }}
                        type="submit"
                        isLoading={isLoading}
                      >
                        Log In
                      </Button>
                    </Box>

                    <Box>
                      <Link to="/signup">
                        <Button
                          borderRadius={"1rem"}
                          width={"100%"}
                          textAlign={"center"}
                          p="1rem"
                          bg={"#EEEEF4"}
                          color="#171717"
                          fontWeight={"400"}
                          fontSize={"0.8rem"}
                          _hover={{
                            background: "gray",
                            color: "white",
                          }}
                        >
                          Create New Account
                        </Button>
                      </Link>
                    </Box>
                  </Stack>
                </Stack>
              </Form>
            </Formik>
          </Card.Root>
        </Box>
      </Center>
    </Container>
  );
};

export default Login;
