import React from "react";
import { Container } from ".";
import {
  Box,
  Card,
  Stack,
  Flex,
  Center,
  Text,
  Input,
  Button,
  Image,
  Field,
} from "@chakra-ui/react";
import image from "../assets/signUp.svg";
import { Form, Formik, Field as FormikField, useFormikContext } from "formik";
import { useMutation } from "@tanstack/react-query";
import { object, string, ref, mixed } from "yup";
import authenservice from "../appwrite/authService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

const validationSignUp = object({
  name: string().required("Name is required"),
  surname: string().required("Surname is required"),
  email: string().email("Email is invalid").required("Email is required"),
  password: string()
    .min(8, "Password must be at least 6 characters")
    .required("Password is required"),
  repassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("conforming password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["signup"],
    mutationFn: authenservice.createUser,
    onSuccess: async (data) => {
      console.log(data);
      if (data) {
        await navigate("/login");
        toast("signup successfully");
      }
    },
    onError: (error) => {
      console.log(error);
      toast("we got error in signup");
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
                  Create a free account by filling data below.
                </Text>
              </Box>
            </Box>

            <Formik
              initialValues={{
                name: "",
                surname: "",
                email: "",
                password: "",
                repassword: "",
              }}
              onSubmit={(values, { resetForm }) => {
                mutate({
                  name: values.name + " " + values.surname,
                  email: values.email,
                  password: values.password,
                });

                resetForm();
              }}
              validationSchema={validationSignUp}
            >
              <Form>
                <Stack display={"flex"} flexDir="column" gap="2rem">
                  <Flex gap="1rem" flexDir={{
                    base:"column",
                    lg:"row"
                  }}>
                    <FormikField name="name">
                      {({ field, meta }) => (
                        <Field.Root invalid={!!(meta.touched && meta.error)}>
                          <Field.Label
                            name="name"
                            color="#171717"
                            fontSize="12px"
                          >
                            Name
                          </Field.Label>
                          <Input
                            {...field}
                            type="text"
                            name="name"
                            placeholder="Enter your name..."
                            _placeholder={{
                              color: "gray.500",
                              fontSize: "12px",
                              fontWeight: "medium",
                            }}
                          />
                          <Field.ErrorText>{meta.error}</Field.ErrorText>
                        </Field.Root>
                      )}
                    </FormikField>

                    <FormikField name="surname">
                      {({ field, meta }) => (
                        <Field.Root invalid={!!(meta.touched && meta.error)}>
                          <Field.Label
                            name="surname"
                            color="#171717"
                            fontSize="12px"
                          >
                            Surname
                          </Field.Label>
                          <Input
                            {...field}
                            type="text"
                            name="surname"
                            placeholder="Enter your surname..."
                            _placeholder={{
                              color: "gray.500",
                              fontSize: "12px",
                              fontWeight: "medium",
                            }}
                          />
                          <Field.ErrorText>{meta.error}</Field.ErrorText>
                        </Field.Root>
                      )}
                    </FormikField>
                  </Flex>
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
                  <FormikField name="repassword">
                    {({ field, meta }) => (
                      <Field.Root invalid={!!(meta.touched && meta.error)}>
                        <Field.Label
                          name="repassword"
                          color="#171717"
                          fontSize="12px"
                        >
                          Repeat Password
                        </Field.Label>
                        <Input
                          {...field}
                          type="text"
                          name="repassword"
                          placeholder="Re-enter your password..."
                          _placeholder={{
                            color: "gray.500",
                            fontSize: "12px",
                            fontWeight: "medium",
                          }}
                        />
                        <Field.ErrorText>{meta.error}</Field.ErrorText>
                      </Field.Root>
                    )}
                  </FormikField>

                  <Button
                    type="submit"
                    borderRadius="1rem"
                    bg="#D8DDE2"
                    color="#797E82"
                    isLoading={isLoading}
                  >
                    Create Account
                  </Button>
                  <Text fontSize={"12px"} color="#797E82" textAlign="center">
                    Already have an account?{" "}
                    <Link to="/login">
                      <Text as="span" color="#5F00D9">
                        Login
                      </Text>
                    </Link>
                  </Text>
                </Stack>
              </Form>
            </Formik>
          </Card.Root>
        </Box>
      </Center>
    </Container>
  );
};

export default SignUp;
