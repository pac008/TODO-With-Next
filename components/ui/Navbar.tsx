import { useContext } from "react";
import NextLink from "next/link";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlineIcon from "@mui/icons-material/MenuOutlined";
import { UIContext } from "@/context/ui";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlineIcon />
        </IconButton>
        <NextLink href="/" passHref>
          <Typography variant="h6" color={"white"}>
            OpenJira
          </Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
