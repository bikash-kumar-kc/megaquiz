import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
import { Chart, useChart } from "@chakra-ui/charts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import storage from "../../appwrite/storage";
import { Container } from "..";
import bgImage from "../../assets/bgimage.jpg";

const Profile = () => {
  const userData = useSelector((store) => store.userAuth.userData);
  const record = useSelector((store) => store.userrecord.userData);
  const isRecord = useSelector((store) => store.userrecord.isRecord);

  const [imageUrl, setImageUrl] = useState(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0, unattempt: 0 });

  const { register, handleSubmit, reset } = useForm();

  const capitalizeWords = (str) =>
    str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

  const chart = useChart({
    data: [
      { allocation: stats.correct, type: "Correct" },
      { allocation: stats.wrong, type: "Wrong" },
      { allocation: stats.unattempt, type: "Unattempted" },
    ],
    series: [{ name: "allocation", color: "teal.solid" }],
  });

  const userId = userData?.$id;

  // Upload Profile Image
  const { mutate: uploadImage } = useMutation({
    mutationKey: ["profile-image"],
    mutationFn: storage.creatingFile,
    onSuccess: () => {
      toast.success("Profile image uploaded!");
      fetchProfileImage();
      reset(); // reset file input
    },
    onError: () => toast.error("Failed to upload image"),
  });

  // Fetch Profile Image
  const fetchProfileImage = () => {
    const data= storage
      .getFile(userId);
      console.log(data);
      setImageUrl(data)
  };

  const submitImage = (data) => {
    if (data.file && data.file[0]) {
      uploadImage({ file: data.file[0], userId: userId });
    }
  };

  // Compute Stats and fetch image
  useEffect(() => {
    if (isRecord && record) {
      const total = Number(record.questionAttempt) || 1;
      setStats({
        correct: (Number(record.correctAttempt) / total) * 100,
        wrong: (Number(record.wrongAttempt) / total) * 100,
        unattempt: (Number(record.unattempt) / total) * 100,
      });
    }
    if (userData?.$id) fetchProfileImage();
  }, [record, isRecord, userData]);

  if (!userData) return null;

  return (
    <Container>
      {/* Background Banner */}
      <Box
        bgImage={`url(${bgImage})`}
        bgSize="cover"
        bgPos="center"
        height={{ base: "200px", md: "300px" }}
        borderRadius="md"
        mb="6"
      />

      {/* Profile Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        gap="8"
        mb="8"
      >
        {/* Profile Picture */}
        <Box
          w={{ base: "150px", md: "200px" }}
          h={{ base: "150px", md: "200px" }}
          borderRadius="full"
          overflow="hidden"
          shadow="md"
          display="flex"
          justifyContent="center"
        >
          {!imageUrl ? (
            <Center h="100%" bg="gray.100">
              <form onSubmit={handleSubmit(submitImage)}>
                <Stack spacing={2} align="center">
                  <Button
                    as="label"
                    htmlFor="file"
                    leftIcon={<BsUpload />}
                    colorScheme="teal"
                  >
                    Upload
                  </Button>
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    {...register("file", { required: true })}
                    hidden
                  />
                  <Button
                    type="submit"
                    size="sm"
                    bg="green.500"
                    _hover={{ bg: "green.400" }}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </Center>
          ) : (
            <img
              src={imageUrl}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={() => setImageUrl(null)} // reset if broken
            />
          )}
        </Box>

        {/* User Info */}
        <Box textAlign={{ base: "center", md: "left" }}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            {capitalizeWords(userData?.name || "User")}
          </Heading>
          <Text color="gray.500">
            Rank:{" "}
            {stats.correct > 80
              ? "Pro"
              : stats.correct >= 30
              ? "Intermediate"
              : "Beginner"}
          </Text>
          <Text color="gray.600" mt="2">
            {stats.correct > 80
              ? "Excellent in quizzes!"
              : stats.correct >= 30
              ? "Good performance."
              : "Keep practicing!"}
          </Text>
        </Box>
      </Flex>

      {/* Quiz Stats Section */}
      <Box bg="white" p="6" borderRadius="md" shadow="sm">
        <Heading fontSize="xl" mb="4" textAlign="center">
          Quiz Record
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-around"
          gap="6"
        >
          {/* Chart */}
          <Chart.Root chart={chart} width={{ base: "250px", md: "400px" }}>
            <BarChart data={chart.data} barSize={30}>
              <CartesianGrid stroke="#ccc" vertical={false} />
              <XAxis dataKey={chart.key("type")} />
              <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
              {chart.series.map((item) => (
                <Bar
                  key={item.name}
                  dataKey={chart.key(item.name)}
                  fill={chart.color(item.color)}
                  radius={6}
                />
              ))}
            </BarChart>
          </Chart.Root>

          {/* Stats Info */}
          <Box textAlign={{ base: "center", md: "left" }} color="gray.700">
            <Text>Total Games Played: {record?.gamePlayed || 0}</Text>
            <Text>Total Questions Attempted: {record?.questionAttempt || 0}</Text>
            <Text>Correct: {record?.correctAttempt || 0}</Text>
            <Text>Wrong: {record?.wrongAttempt || 0}</Text>
            <Text>Unattempted: {record?.unattempt || 0}</Text>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default Profile;
