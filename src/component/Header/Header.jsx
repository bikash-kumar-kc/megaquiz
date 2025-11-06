import React from "react";
import { Container } from "..";
import { Box } from "@chakra-ui/react";
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
