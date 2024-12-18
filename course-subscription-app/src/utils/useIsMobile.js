import { useMediaQuery } from "@mui/material";

export const useIsMobile = () => {
  return useMediaQuery((theme) => theme.breakpoints.down("sm"));
};
