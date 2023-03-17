import Head from "next/head";
import { Box } from "@mui/material";
import { FC } from "react";
import { Navbar } from "../ui";
import { Sidebar } from "../ui/Sidebar";

interface Props {
  title?: string;
  children: JSX.Element | JSX.Element[]
}

export const Layout: FC<Props> = ({ title = "OpenJira", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />
      {/* sidebar */}
      <Box sx={{ padding: "10px 20px" }}> {children}</Box>
    </Box>
  );
};
