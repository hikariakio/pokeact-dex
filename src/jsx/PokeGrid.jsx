import { SmallPokeCard } from "./SmallPokeCard";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

export function PokeGrid(props) {
  return (
    <Grid justifyContent={"space-evenly"} container>
      {props.showedPokeList.map((pokemon) => (
        <Grid key={pokemon["id"]}>
          <SmallPokeCard  pokemonDetails={pokemon} />
        </Grid>
      ))}
    </Grid>
  );
}
