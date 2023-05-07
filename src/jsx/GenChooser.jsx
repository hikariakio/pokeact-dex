import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

export function GenChooser(props) {
  return (
    <>
      <div className={"mt-3"}>
        <h2 className={"gen-heading"}> Pokémon Generations</h2>
      </div>
      <Grid className={"center"} justifyContent={"space-evenly"} container columns={10}>
        {props.gens.map((generation, index) => (
          <Grid xs={5} sm={3} lg={2} key={index} style={{ padding: "12px" }}>
            <button
              onClick={() => props.handleButtonClick(index)}
              className={`gen-button ${index === props.idx ? "active" : ""}`}
            >
              {generation.name}
            </button>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
