import React from "react";
import { tailSlashRegex } from "../_helper/helper";
export function NoPokemonResult() {
  return (
    <div
      className={"center"}
      style={{
        minHeight: "30rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingTop: "20px",
          paddingBottom: "20px",
          border: "2px solid red",
          borderRadius: "25px",
        }}
      >
        <h5>No Pokémon Matched Your Search!</h5>
        <img
          src={require(`../assets/misc/gastly_missing.gif`)}
          alt="PokemonNotFound"
        />
          <p className="bling-anim" bling-text={"Try Again!"} />

      </div>
    </div>
  );
}
