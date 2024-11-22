import { useDroppable } from "@dnd-kit/core";
import React from "react";
import Grid from "@mui/material/Grid2";

export type Props = {
  id: string;
  height: string;
  children?: React.ReactNode;
};

export const Zone = ({ id, height, children }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <Grid
      ref={setNodeRef}
      container
      spacing={1}
      alignContent="flex-start"
      sx={{
        backgroundColor: isOver ? "lightgreen" : "white",
        border: "1px solid lightgray",
        height,
        padding: "8px",
      }}
    >
      {children}
    </Grid>
  );
};
