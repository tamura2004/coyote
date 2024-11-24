import { useDroppable } from "@dnd-kit/core";
import React from "react";
import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";

export type Props = {
  id: string;
  label?: string;
  height: string;
  children?: React.ReactNode;
  width?: number;
};

export const Zone = ({ id, label, height, children, width }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  width = width ?? 12;
  return (
    <Grid
      size={{ xs: width }}
      ref={setNodeRef}
      container
      spacing={1}
      alignItems="center"
      alignContent="flex-start"
      sx={{
        backgroundColor: isOver ? "lightgreen" : "white",
        border: "1px solid lightgray",
        height,
        padding: "8px",
        touchAction: "none",
      }}
    >
      <Grid size={{xs:12}}>
        <Typography variant="h6">{label}</Typography>
      </Grid>
      {children}
    </Grid>
  );
};
