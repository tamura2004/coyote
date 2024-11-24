import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Grid from "@mui/material/Grid2";

type Props = {
  id: string;
  name: string;
};

export const Card = ({ id, name }: Props) => {
  const { setNodeRef, transform, listeners, attributes, isDragging } =
    useDraggable({
      id,
    });
  return (
    <Grid
      ref={setNodeRef}
      sx={{
        transform: CSS.Translate.toString(transform),
        cursor: isDragging ? "grabbing" : "grab",
        width: "53px",
        height: "70px",
        border: "2px solid darkgray",
        borderRadius: "4px",
        padding: "4px",
        touchAction: "none",
        textAlign: "center",
      }}
      {...listeners}
      {...attributes}
    >
      {name}
    </Grid>
  );
};
