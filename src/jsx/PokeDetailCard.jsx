import {
  useFetchPokemonFromID,
  useFetchPokemonSpeciesFromID,
} from "../hooks/fetchPokemonFromID";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import { BGColor, ShadowColor, TxtColor } from "../_helper/CustomColor";
import { capitalizeFirstLetter, tailSlashRegex } from "../_helper/helper";
import { DetailBar, DetailInfo } from "./Detail";
import { PokeDexDataTable } from "./PokedexDataTable";
import { Radar } from "./RadarChart";
import seedrandom from "seedrandom";
import { GIF } from "./GIF";
import { Error404 } from "./Error404";

export function PokeDetail({ pokeID }) {
  const [pokemonSpecies, speciesLoading, speciesError] =
    useFetchPokemonSpeciesFromID(pokeID);
  const [pokemon, loading, error] = useFetchPokemonFromID(pokeID);

  useEffect(() => {
    if (pokemon.length !== 0) {
      document.title = capitalizeFirstLetter(pokemon["name"]);
      document.querySelector("link[rel~='icon']").href =
        pokemon["sprites"]["other"]["official-artwork"]["front_default"];
    }
    else
    {
      document.title = "Pokeact Dex";
      document.querySelector(
          "link[rel~='icon']"
      ).href = require(`../assets/misc/small_pokeball.png`);
    }
  }, [pokemon]);
  // react-portals
  function getEnglishGenus(obj) {
    return obj["language"]["name"] === "en";
  }

  return speciesLoading || loading ? (
    <GIF gifName="pikachu_waiting" gifTitle={"Loading Pokemon Data!"} />
  ) : error || speciesError ? (
    <Error404 />
  ) : (
    <>
      <Grid container>
        <Grid xs={12} sm={12} md={6} order={{ xs: 2, sm: 2, md: 1 }}>
          <DetailBar
            colorName={pokemonSpecies["color"]["name"]}
            text={
              pokemonSpecies["genera"].filter(getEnglishGenus).length === 0
                ? "Unknown Pokemon"
                : pokemonSpecies["genera"].filter(getEnglishGenus)[0]["genus"]
            }
          />
          <DetailInfo
            mainInfo={
              <Radar
                stats={pokemon["stats"]}
                color={pokemonSpecies["color"]["name"]}
              />
            }
            colorName={pokemonSpecies["color"]["name"]}
            title="Abilities :&nbsp;"
            titleDetails={pokemon["abilities"].map((ability, num) => (
              <div key={num}>
                <p
                  className={"poke-ability"}
                  style={{
                    color: TxtColor[pokemonSpecies["color"]["name"]],
                    backgroundColor: BGColor[pokemonSpecies["color"]["name"]],
                  }}
                >
                  {ability["ability"]["name"]}
                </p>
              </div>
            ))}
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} order={{ xs: 1, sm: 1, md: 2 }}>
          <DetailBar
            colorName={pokemonSpecies["color"]["name"]}
            text={capitalizeFirstLetter(pokemon["name"])}
          />
          <DetailInfo
            mainInfo={
              <img
                className="pokeimage"
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={`Sprite of ${pokemon.name}`}
              />
            }
            colorName={pokemonSpecies["color"]["name"]}
            title="Type :&nbsp;"
            titleDetails={pokemon["types"].map((type, num) => (
              <div key={num}>
                <img
                  key={num}
                  className="poketype"
                  src={require(`../assets/poketype/type${
                    type["type"]["url"].match(tailSlashRegex)[1]
                  }.png`)}
                  alt={`type${num + 1} of pokemon`}
                />
              </div>
            ))}
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} order={3}>
          <PokeDexDataTable
            colorName={pokemonSpecies["color"]["name"]}
            id={pokemon["id"]}
            weight={pokemon["weight"]}
            height={pokemon["height"]}
            habitat={
              pokemonSpecies["habitat"] !== null
                ? pokemonSpecies["habitat"]["name"]
                : "Unknown"
            }
            catchRate={pokemonSpecies["capture_rate"]}
            baseExperience={
              pokemon["base_experience"] !== null
                ? pokemon["base_experience"]
                : "Unknown"
            }
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} order={4}>
          <Map id={pokemon["id"]} />
        </Grid>
      </Grid>
    </>
  );
}

export function Map({ id }) {
  const [imageData, setImageData] = useState(null);
  const [address, setAddress] = useState("");

  var seedrandom = require("seedrandom");
  var seed = id * new Date().getDate() * id;
  var rng = seedrandom(seed);

  const minLat = -27.5;
  const maxLat = -27.4;
  const minLng = 152.9;
  const maxLng = 153.1;

  const lat = rng() * (maxLat - minLat) + minLat;
  const lng = rng() * (maxLng - minLng) + minLng;
  const center = `${lat},${lng}`;

  useEffect(() => {
    const url = `https://maps.googleapis.com/maps/api/staticmap?key=${process.env.REACT_APP_GOOGLE_MAP_APIKEY}&maptype=roadmap&scale=1&center=${center}&size=450x220&zoom=14&markers=color:red|label:P|${center}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        setImageData(URL.createObjectURL(blob));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [id]);

  useEffect(() => {
    async function fetchAdd() {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${center}&key=${process.env.REACT_APP_GOOGLE_MAP_APIKEY}`
        );
        const data = await response.json();
        setAddress(data["results"][0]["formatted_address"]);
      } catch (error) {
        setAddress("");
      }
    }
    fetchAdd();
  }, [id]);

  return (
    <div
      className={"center"}
      style={{
        marginTop: "1rem",
      }}
    >
      <h2>Where To Catch!</h2>
      {!imageData || address === "" ? (
        <p>Loading...</p>
      ) : (
        <div style={{ overflow: "auto" }}>
          <img src={imageData} alt="Map" />
          <p>{address}</p>
        </div>
      )}
    </div>
  );
}
