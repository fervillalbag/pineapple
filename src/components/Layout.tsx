import { useEffect, useState } from "react";
import { m } from "framer-motion";

import { Navbar } from "./";
import {
  NURA_AUTH_REGISTER_INFO,
  NURA_AUTH_USER_INFO,
  authInitialValue,
} from "../utils/constants/auth";
import { useLocalStorageState } from "../hooks";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [_, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const scrollingDown = currentScrollPos > prevScrollPos;

      setIsVisible(scrollingDown);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    handleUpdateForm(authInitialValue);

    localStorage.getItem(NURA_AUTH_USER_INFO)
      ? setShowNavbar(true)
      : setShowNavbar(false);
  }, []);

  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  return (
    <div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
      >
        {children}
      </m.div>
      {showNavbar ? <Navbar isVisible={isVisible} /> : null}
    </div>
  );
}
