import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiHome } from "react-icons/ti";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdOutlineQueryStats } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { RiLoginBoxFill } from "react-icons/ri";
import { Container } from "..";
import { Box, Button, HStack, Icon, Text } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import authenservice from "../../appwrite/authService";
import { toast } from "react-toastify";
import { logout } from "../../store/authSlice";
import NavRequirement from "./NavRequirement";
import SideBar from "./SideBar";

const Header = ({ authStatus }) => {
  

  return (
    <Box>
      <Box as="header" display={{
        base:"none",
        lg:"block"
      }}>
      <Container>
        <Box
          as="nav"
          display={"flex"}
          justifyContent={"space-between"}
          pl="4rem"
          py="1rem"
          gap="1rem"
        >
          <NavRequirement authStatus={authStatus} />
        </Box>
      </Container>
    </Box>
   <Box display={{
    base:"block",
    lg:"none"
   }}>
     <SideBar authStatus={authStatus} />
   </Box>
    </Box>
  );
};

export default React.memo(Header);
