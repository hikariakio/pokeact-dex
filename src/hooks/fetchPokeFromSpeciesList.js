import {useEffect, useState} from "react";

export function useFetchPokeFromSpeciesList(speciesList,callback)
{
    const [pokeList, setPokeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchPokemonLists() {
            const lists = await Promise.all(
                speciesList.map(async (specie) => {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${specie["id"]}`);
                    const data = await response.json();
                    return Object.assign(data,{ color:  specie.color,dfid: specie.dfid});
                })
            );
            setPokeList(lists);
            callback(lists);
        }
        if(speciesList.length !== 0) {
            fetchPokemonLists();
        }
    }, [speciesList]);

    return [pokeList,loading,error];

}