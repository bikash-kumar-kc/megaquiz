import { Drawer, Icon } from "@chakra-ui/react";
import React from "react";
import { CloseButton, Portal, Box } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavRequirement from "./NavRequirement";

const SideBar = ({authStatus}) => {
  return (
    <Box display={{
        base:"block",
        lg:"none"
    }}>
        <Drawer.Root placement={"left"}>
      <Drawer.Trigger asChild>
        <Icon as={GiHamburgerMenu} ml="1rem" />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Context>
              {(store) => (
                <Drawer.Body pt="6" spaceY="3">
                  <Box
                    as="ul"
                    display={"flex"}
                    pt="3rem"
                    flexDir={"column"}
                    alignItems={"flex-start"}
                    gap="1.5rem"
                  >
                    <NavRequirement authStatus={authStatus} />
                  </Box>
                </Drawer.Body>
              )}
            </Drawer.Context>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
    </Box>
  );
};

export default SideBar;
