import {useEffect, useState} from "react";

export function useFetchOneGenSpecies(genDetail,callback)
{
    const [pokeSpecies, setPokeSpecies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
            async function fetchPokemonLists() {
              const lists = await Promise.all(
                  genDetail["pokemon_species"].map(async (genPoke,idx) => {
                  const response = await fetch(genPoke.url);
                  const data = await response.json();
                  return {...data, dfid : idx};
                })
              );
                setPokeSpecies(lists);
                callback(lists);
            }
            if(genDetail.length !== 0) {
                fetchPokemonLists();
            }
        }, [genDetail]);

    return [pokeSpecies,loading,error];

}