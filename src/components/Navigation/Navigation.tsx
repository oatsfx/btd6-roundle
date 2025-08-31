import routes from "configs/routes.config";
import {
  FaBars,
  FaCog,
  FaInfoCircle,
  FaShower,
  FaSignal,
  FaUser,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import { RoundGuess } from "components/RoundGuess";

const Navigation = ({}: {}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <p className="font-bold text-inherit">roundle.oatsfx.com</p>
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routes.map((route) => (
          <NavbarItem
            isActive={location.pathname === route.path}
            key={route.key}
          >
            <Link
              href={route.path}
              color={
                location.pathname === route.path ? "primary" : "foreground"
              }
            >
              {route.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent> */}

      <NavbarContent justify="end">
        <Button onPress={onOpen} isIconOnly>
          <FaInfoCircle className="text-lg" />
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1" />
                <ModalBody>
                  <h3 className="text-lg font-bold">How to Play</h3>
                  <p>Guess the BTD6 round in 6 guesses.</p>
                  <RoundGuess guess={73} answer={82} />
                  <p className="text-sm">
                    In this example, we see that the number of bloons in the
                    correct round is close to 136. We see that the length is
                    lower and the cash earned and RBE is higher.
                  </p>
                  <p className="text-sm">
                    We also see that the correct round has normal and fortified
                    ceramics, but has at least one more type of ceramic as well!
                    It has no BFBs.
                  </p>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button as={Link} color="primary" variant="flat" isIconOnly>
              <FaCog className="text-lg" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {/* <DropdownItem
              key="round-100-mode"
              className="gap-2"
              closeOnSelect={false}
            >
              <Switch isDisabled size="sm">
                Round 100 Mode
              </Switch>
            </DropdownItem> */}
            <DropdownItem key="nothing" className="gap-2" closeOnSelect={false}>
              Nothing here...
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;
