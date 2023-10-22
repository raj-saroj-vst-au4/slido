import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ModalJoinClass from "./ModalJoinClass";
const ActionMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex justify-end p-4 items-center">
      <Menu>
        <MenuButton as={Button} colorScheme="blue">
          Slido
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuGroup defaultValue="asc" title="Conduct">
            <MenuItem value="asc">
              <Link href="/startnew">Start a New Session</Link>
            </MenuItem>
            <MenuItem value="desc">
              <Link href="/schedule">Schedule a New Session</Link>
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Participate">
            <MenuItem value="all">
              <Link href="/sessions">All Sessions</Link>
            </MenuItem>
            <MenuItem onClick={onOpen}>Join a Session</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>

      <div className="ml-4 text-white">|</div>
      <div className="ml-4">
        <UserButton afterSignOutUrl="/" />
      </div>
      <ModalJoinClass isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default ActionMenu;
