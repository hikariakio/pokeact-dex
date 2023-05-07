import React, { useState, useEffect } from "react";
import { SmallPokeCard } from "./SmallPokeCard";
import { useFetchPokemonGen } from "../hooks/fetchPokemonGen";
import { useFetchPokemonGenDetail } from "../hooks/fetchPokemonGenDetail";
import { GenChooser } from "./GenChooser";
import { useFetchOneGenSpecies } from "../hooks/fetchOneGenAllSpecies";
import { useFetchPokeFromSpeciesList } from "../hooks/fetchPokeFromSpeciesList";
import { GIF } from "./GIF";
import { FilterBox } from "./FilterBox";
import { NoPokemonResult } from "./NoPokemonResult";
import { PokeGrid } from "./PokeGrid";
import Pagination from "@mui/material/Pagination";

export function PokeHome() {
  const [activeGenerationIndex, setActiveGenerationIndex] = useState(-1);
  const [pokemonSpeciesList, setPokemonSpeciesList] = useState([]);

  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokeList, setFilteredPokeList] = useState([]);

  const [showedPokeListPerPage, setShowedPokeListPerPage] = useState([]);
  const [maxPokePerPage, setMaxPokePerPage] = useState(15);

  // generations [{ name , url }]
  var [generations, genLoading, genError] = useFetchPokemonGen();
  //  https://pokeapi.co/api/v2/generation/1
  var [genDetail, genDetailLoading, genDetailError] = useFetchPokemonGenDetail(
    generations[activeGenerationIndex]
  );

  useEffect(() => {
    document.title = "Pokeact Dex";
    document.querySelector(
      "link[rel~='icon']"
    ).href = require(`../assets/misc/small_pokeball.png`);
  }, []);

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => decidePokeListForPage(page), [page, filteredPokeList]);

  function decidePokeListForPage(value) {
    setShowedPokeListPerPage(
      filteredPokeList.slice(
        maxPokePerPage * (value - 1),
        Math.min(maxPokePerPage * value - 1) + 1,
        filteredPokeList.length
      )
    );
  }

  useFetchOneGenSpecies(genDetail, setSpeciesList);

  function setSpeciesList(speciesList) {
    setPokemonList([]);
    setFilteredPokeList([]);
    setPokemonSpeciesList(speciesList);
  }

  useFetchPokeFromSpeciesList(pokemonSpeciesList, setFullPokemonList);

  function setFullPokemonList(pokeList) {
    setPokemonList(pokeList);
    setFilteredPokeList(pokeList);
  }

  //happens when choose genbutton
  const genButtonClick = (index) => {
    if (activeGenerationIndex !== index) {
      setActiveGenerationIndex(index);
      clearAllList();
    }
  };

  function clearAllList() {
    setPokemonSpeciesList([]);
    setPokemonList([]);
    setFilteredPokeList([]);
    setShowedPokeListPerPage([]);
    setPage(1);
  }

  function searchAndSortPoke(searchKey, f) {
    const filteredData = pokemonList.filter((item) =>
      item.name.includes(searchKey.toLowerCase())
    );

    if (f !== null) {
      const sortedData = filteredData.slice().sort(f);
      setFilteredPokeList(sortedData);
      setPage(1);
    }
  }

  function sortPoke(f) {
    if (f !== null) {
      const filteredData = filteredPokeList.slice().sort(f);
      setFilteredPokeList(filteredData);
      setPage(1);
    }
  }

  return (
    <>
      <GenChooser
        idx={activeGenerationIndex}
        gens={generations}
        handleButtonClick={(idx) => {
          if (activeGenerationIndex === -1 || pokemonList.length !== 0)
            genButtonClick(idx);
        }}
      />

      {activeGenerationIndex === -1 ? (
        <GIF
          gifName={"snorlex_sleep"}
          gifTitle={"Choose Any Generation To Start!"}
        />
      ) : pokemonList.length === 0 ? (
        <GIF gifName={"pikachu_waiting"} gifTitle={"Fetching Wild Pokémons!"} />
      ) : (
        <>
          <FilterBox searchPoke={searchAndSortPoke} sortPoke={sortPoke} />

          {filteredPokeList.length === 0 ? (
            <NoPokemonResult />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // minHeight: "30rem",
              }}
            >
              <Pagination
                sx={{ mx: "auto", marginTop: "10px", marginBottom: "10px" }}
                count={Math.ceil(filteredPokeList.length / maxPokePerPage)}
                page={page}
                onChange={handleChange}
                variant="outlined"
                siblingCount={1}
                boundaryCount={1}
                size="small"
              />
              <PokeGrid showedPokeList={showedPokeListPerPage} />
              <Pagination
                sx={{ mx: "auto", marginTop: "10px", marginBottom: "10px" }}
                count={Math.ceil(filteredPokeList.length / maxPokePerPage)}
                page={page}
                onChange={handleChange}
                variant="outlined"
                siblingCount={1}
                boundaryCount={1}
                size="small"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
{
  /*https://dribbble.com/lilong*/
  // https://dribbble.com/RemovT
}
export default PokeHome;
