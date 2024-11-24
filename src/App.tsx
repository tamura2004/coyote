import { DndContext } from "@dnd-kit/core";
import { Card } from "./components/Card.tsx";
import { Zone } from "./components/Zone.tsx";
import { useCard } from "./hooks/useCard.ts";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { isZone } from "./models/Zone.ts";
import { Score } from "./components/Score.tsx";
import { SelectNumOfPlayers } from "./components/SelectNumOfPlayers.tsx";

function App() {
  const { stack, pile, hand, you, moveCard, deal, reset, numOfPlayers, setNumOfPlayers, total } =
    useCard();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Coyote
          </Typography>
          <SelectNumOfPlayers setNumOfPlayers={setNumOfPlayers} numOfPlayers={numOfPlayers} />
          <Button color="inherit" onClick={() => deal()}>
            <Typography>手札を配る</Typography>
          </Button>
          <Button color="inherit" onClick={() => reset()}>
            <Typography>最初から</Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <DndContext
        onDragEnd={({ active, over }) => {
          if (!isZone(over?.id) || typeof active.id !== "string") return;
          moveCard(active.id, over.id);
        }}
      >
        <Toolbar />
        <Grid container spacing={1}>
          <Score label="最小" score={total} />
          <Score label="平均" score={total} />
          <Score label="最大" score={total} />
          <Zone id="stack" label="山札" height="300px">
            {stack.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </Zone>
          <Zone id="pile" label="捨札" height="300px">
            {pile.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </Zone>
          <Zone id="hand" label="場札" height="140px" width={10}>
            {hand.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </Zone>
          <Zone id="you" label="あなた" height="140px" width={2}>
            {you.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </Zone>
        </Grid>
      </DndContext>
    </>
  );
}

export default App;
