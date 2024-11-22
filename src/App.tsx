import { DndContext } from "@dnd-kit/core";
import { Card } from "./components/Card.tsx";
import { Zone } from "./components/Zone.tsx";
import { useCard } from "./hooks/useCard.ts";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { isZone } from "./models/Zone.ts";

function App() {
  const { stack, pile, hand, moveCard } = useCard();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Coyote</Typography>
        </Toolbar>
      </AppBar>
      <DndContext
        onDragEnd={({ active, over }) => {
          if (!isZone(over?.id) || typeof active.id !== "string") return;
          moveCard(active.id, over.id);
        }}
      >
        <Toolbar />
        <Stack spacing={2}>
          <Zone id="stack" height="320px">
            {stack.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </Zone>
          <Zone id="pile" height="320px">
            {pile.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </Zone>
          <Zone id="hand" height="108px">
            {hand.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </Zone>
        </Stack>
      </DndContext>
    </>
  );
}

export default App;
