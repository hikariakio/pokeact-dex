import React, { useEffect } from "react";
import { GIF } from "./GIF";
import { capitalizeFirstLetter } from "../_helper/helper";

export function Error404() {
  useEffect(() => {
    document.title = "404 Not Found";
    document.querySelector(
      "link[rel~='icon']"
    ).href = require(`../assets/misc/small_pokeball.png`);
  }, []);

  return (
    <>
      <GIF gifName="meowth_404" gifTitle="404 ALERT!" />
      <h3 style={{ marginTop: "auto", textAlign: "center" }}>
        The Page or Pokémon you requested could not be found.
      </h3>
    </>
  );
}
