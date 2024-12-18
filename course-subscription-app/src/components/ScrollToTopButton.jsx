import { useState, useEffect } from "react";
import { useIsMobile } from "../utils/useIsMobile";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopButton = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  console.log("🚀 ~ ScrollToTopButton ~ isVisible:", isVisible);

  useEffect(() => {
    const scrollableElement = document.querySelector("#scrollable-container");

    const handleScroll = () => {
      const scrollPosition = scrollableElement
        ? scrollableElement.scrollTop
        : window.scrollY;
      console.log("Scroll position:", scrollPosition);
      setIsVisible(scrollPosition > 300);
    };

    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    const scrollableElement =
      document.querySelector("#scrollable-container") || window;
    if (scrollableElement === window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollableElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isMobile || !isVisible) {
    console.log(`🚀 ~ ScrollToTopButton ~ isVisible: ${isVisible}`);
    return null;
  }

  return (
    <>
      <Zoom in={isVisible}>
        <Fab
          size="small"
          onClick={scrollToTop}
          sx={{ position: "fixed", bottom: 16, right: 16, backgroundColor: "#201F40", color: "#FFFFFF" }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </>
  );
};

export default ScrollToTopButton;
