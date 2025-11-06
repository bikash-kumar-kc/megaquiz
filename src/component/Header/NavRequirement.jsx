
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TiHome } from "react-icons/ti";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdOutlineQueryStats } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { RiLoginBoxFill } from "react-icons/ri";
import { Box, Button, HStack, Icon, Text } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import authenservice from "../../appwrite/authService";
import { toast } from "react-toastify";
import { logout } from "../../store/authSlice";



const NavRequirement = ({authStatus}) => {

    const navigate = useNavigate();
  const dispatch = useDispatch();

  const navLinks = useMemo(
    () => [
      { name: "Home", path: "/", icon: <TiHome />, active: true },
      {
        name: "Quiz",
        path: "/quizoption",
        icon: <IoGameController />,
        active: authStatus,
      },
      {
        name: "Profile",
        path: "/profile",
        icon: <MdOutlineQueryStats />,
        active: authStatus,
      },
      {
        name: "SignUp",
        path: "/signup",
        icon: <SiGnuprivacyguard />,
        active: !authStatus,
      },
      {
        name: "Login",
        path: "/login",
        icon: <RiLoginBoxFill />,
        active: !authStatus,
      },
    ],
    [authStatus]
  );

  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: authenservice.logoutUser,
    onSuccess: (data) => {
      navigate("/");
      toast("logout successfully");
      dispatch(logout());
    },
    onError: (error) => {
      toast("error in logout");
    },
  });
  return (
    <>
    <HStack>
            <Icon size="lg" color="blue.600">
              <FaRocket />
            </Icon>
            <Text fontSize={"1rem"} fontWeight={"700"}>
              Quiz_Mania
            </Text>
          </HStack>

          <Box as="ul" display={"flex"} flexDir={{
            base:"column",
            lg:"row"
          }} gap="2rem">
            {navLinks.map(
              (link) =>
                link.active && (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      style={({ isActive }) => ({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.5rem 1rem",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "green" : "inherit",
                        textDecoration: "none",
                        borderRadius: "0.25rem",
                        transition: "0.4s",
                      })}
                    >
                      {link.icon} {link.name}
                    </NavLink>
                  </li>
                )
            )}

            {authStatus && (
              <li>
                <Button
                  bg="inherit"
                  color="black"
                  p="0"
                  margin={"0"}
                  _hover={{
                    bg: "gray",
                    color: "whiteSmoke",
                  }}
                  gap="0.4rem"
                  px="1rem"
                  transition={".4s"}
                  borderRadius={"0"}
                  onClick={() => {
                    mutate();
                  }}
                >
                  <Icon>
                    <CiLogout />
                  </Icon>
                  <Text>Logout</Text>
                </Button>
              </li>
            )}
          </Box></>
  )
}

export default NavRequirement
