import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";

type Props = {
  numOfPlayers: number;
  setNumOfPlayers: (num: number) => void;
}

export const SelectNumOfPlayers = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        color="inherit"
        id="player-number-select-button"
        aria-controls={open ? "player-number-select-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        プレイヤー人数: {props.numOfPlayers}
      </Button>
      <Menu
        id="player-number-select-menu"
        aria-labelledby="player-number-select-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {Array.from({ length: 9 }, (_, i) => i + 2).map((num) => (
          <MenuItem key={num} onClick={() => {props.setNumOfPlayers(num); handleClose();}}>
            {num}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
