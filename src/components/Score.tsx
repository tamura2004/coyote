import Grid from "@mui/material/Grid2";
import { Stack, Typography } from "@mui/material";

type Props = {
  label: string;
  score: number;
};

export const Score = ({ label, score }: Props) => {
  return (
    <Grid
      size={{ xs: 4 }}
      sx={{ border: "1px solid lightgray", padding: "16px" }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "16px",
        }}
      >
        <Typography variant="body1">{label}</Typography>
        <Typography variant="h5">{score}</Typography>
      </Stack>
    </Grid>
  );
};
