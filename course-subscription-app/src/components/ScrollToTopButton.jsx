import { useState, useEffect } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    console.log("Scroll event detected");
    console.log("window.scrollY:", window.scrollY);
    if (window.scrollY > 50) {
      console.log("Setting showButton to true");
      setShowButton(true);
    } else {
      console.log("Setting showButton to false");
      setShowButton(false);
    }
  };

  useEffect(() => {
    console.log("Adding scroll event listener");
    window.addEventListener("scroll", handleScroll);
    return () => {
      console.log("Removing scroll event listener");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    console.log("Scrolling to top");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={showButton}>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;
