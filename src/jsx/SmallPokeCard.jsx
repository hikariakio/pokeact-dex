import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import Grow from '@mui/material/Grow';
import {capitalizeFirstLetter, padZero, tailSlashRegex} from "../_helper/helper";

export function SmallPokeCard(props) {
  const {pokemonDetails} = props
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);





  const handleDivClick = (pokeID) => {
    if(pokeID !== undefined)
      navigate(`/pokeact-dex/${pokeID}`);
  };

  const handleDivMouseEnter = () => {
    setIsHovered(true);
  };

  const handleDivMouseLeave = () => {
    setIsHovered(false);
  };



  return (
      (
      <Grow
          in={true}
          timeout={{
            appear: 0,
            enter: 700,
            exit:500,
          }}
      >

      <div
        onClick={ () =>  handleDivClick(pokemonDetails["id"])}
        onMouseEnter={handleDivMouseEnter}
        onMouseLeave={handleDivMouseLeave}

        className={`center text-truncate small-pokecard  ${isHovered ? 'hover-animated' : ''}`}
      >
      {pokemonDetails && (
        <>

          <h3 className="pokename">
            {capitalizeFirstLetter(pokemonDetails.name)}
          </h3>

          <div>
              {
                pokemonDetails["types"].map((type,num)=> (
                      <img
                          key = {num}
                          className="poketype"
                          src={require(`../assets/poketype/type${type["type"]["url"].match(tailSlashRegex)[1]}.png`)}
                          alt = {`type${num+1} of pokemon`}
                      />

                    ))
               }
          </div>

          <img
            className="pokeimage"
            src={pokemonDetails.sprites.other["official-artwork"].front_default}
            alt={`Sprite of ${pokemonDetails.name}`}
          />

          <p className="pokeid" >
            #{ padZero(pokemonDetails.id)}
            {/*{pokemonDetails["color"]["name"]}*/}
          </p>

        </>
      )}
    </div>
      </Grow>)

  );
}



