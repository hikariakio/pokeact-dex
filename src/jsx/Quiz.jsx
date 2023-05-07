import { useFetchPokemonCount } from "../hooks/fetchTotalPokemonCount";
import React, { useEffect, useState } from "react";
import { useFetchPokemonFromID } from "../hooks/fetchPokemonFromID";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import { capitalizeFirstLetter } from "../_helper/helper";
import Grow from "@mui/material/Grow";
import { GIF } from "./GIF";

export function Quiz() {
  const [pokemonCount, pokemonNames, loading, error] = useFetchPokemonCount();
  const [randomID, setRandomID] = useState(null);
  const [pokeQuizList, setPokeQuizList] = useState([]);
  const [showImage, setShowImage] = useState(false);
  useEffect(() => {
    document.title = "Poké-Quiz";
    document.querySelector(
      "link[rel~='icon']"
    ).href = require(`../assets/misc/small_pokeball.png`);
  }, []);
  function generateQuestion() {
    setShowImage(false);
    setRandomID(Math.floor(Math.random() * pokemonCount) + 1);
  }

  useEffect(() => {
    if (pokemonCount !== 0) generateQuestion();
  }, [pokemonCount]);

  const [quizPokemon, quizPokemonLoading, quizPokemonError] =
    useFetchPokemonFromID(randomID);

  function getRandomNames(pokemonNames, predefinedName) {
    if (predefinedName !== undefined) {
      let nameSet = new Set();

      // Add the predefined name to the set
      nameSet.add(predefinedName);

      // Keep adding unique names from the Pokemon list until the set has 4 names
      while (nameSet.size < 4) {
        const randomIndex = Math.floor(Math.random() * pokemonNames.length);
        nameSet.add(pokemonNames[randomIndex].name);
      }

      // Convert the set to an array and return it
      setPokeQuizList(Array.from(nameSet).sort());
    }
  }


  useEffect(
    () => getRandomNames(pokemonNames, quizPokemon["name"]),
    [quizPokemon]
  );

  if (quizPokemonLoading)
    return <GIF gifName={"pikachu_waiting"} gifTitle={"Creating Your Quiz!"} />;
  return (
    quizPokemon.length !== 0 && (
      <>
        <Grid
          className={"center"}
          style={{ marginTop: "auto" }}
          container
        >
          <Grid sm={12} md={6} style={{ overflow: "auto",margin:"auto" }}>
            <img
              className={`quiz-pokeimage ${showImage === true ? "active" : ""}`}
              src={quizPokemon.sprites.other["official-artwork"].front_default}
              alt={`Sprite of ${quizPokemon.name}`}
            />
          </Grid>
          <Grid sm={12} md={6} style={{ margin:"auto" }}>
            <h1>Who's that Pokémon??</h1>
            <QuizForm
              optionList={pokeQuizList}
              tryAgain={generateQuestion}
              correctName={quizPokemon["name"]}
              setShowImage={setShowImage}
            />
          </Grid>
        </Grid>
      </>
    )
  );
}

function QuizForm(props) {
  const [formMsg, setFormMsg] = useState("");
  const [quizEnd, setQuizEnd] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data["Choice"] === null) {
      setFormMsg("Please choose one option!");
      setTimeout(() => setFormMsg(""), 2000);
    } else {
      if (data["Choice"] === props.correctName) {
        setFormMsg(`\u2705 Bingo! Can you beat next? \u2705`);
      } else {
        setFormMsg(
          `\u274C Oops. The right answer is ${capitalizeFirstLetter(
            props.correctName
          )}. \u274C`
        );
      }
      setQuizEnd(true);
      props.setShowImage(true);
      setTimeout(props.tryAgain, 2500);
    }
  };

  // console.log(watch("Choice")); // watch input value by passing the name of it
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <form className={"center"} onSubmit={handleSubmit(onSubmit)}>
      <Grid container className={"center"}>
        {props.optionList.map((option) => (
          <Grid key={option} xs={12} sm={6} md={12} lg={6}>
            <label className={"radio-container"}>
              <Grow in={true} timeout={{ enter: 1000 }}>
                <span className="option-text">
                  {capitalizeFirstLetter(option)}
                </span>
              </Grow>

              <input {...register("Choice")} type="radio" value={option} />
              <Grow in={true} timeout={{ enter: 1000 }}>
                <span className="checkmark"></span>
              </Grow>
            </label>
          </Grid>
        ))}
      </Grid>
      <h4 className={"quiz-status"}> &nbsp;{formMsg} </h4>

      {quizEnd === false && (
        <div className={"show-column"}>
          <input
            className={"quiz-button"}
            // style={{ display: "block", marginTop: 20 }}
            type="submit"
            value="Lock My Answer!"
          />

          <input
            className={"quiz-button"}
            // style={{ display: "block", marginTop: 20 }}
            type="button"
            onClick={props.tryAgain}
            value="Try Another Pokémon!"
          />
        </div>
      )}
    </form>
  );
}
