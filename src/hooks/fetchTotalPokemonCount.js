import { useEffect, useState } from "react";

export function useFetchPokemonCount() {
    const [pokemonCount, setPokemonCount] = useState(0);
    const [pokemonNames, setPokemonNames] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchPokemonCount() {
            setLoading(true);
            setError(false);

            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species?limit=10000`);
                const data = await response.json();
                setPokemonCount(data["count"]);
                setPokemonNames(data["results"])
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchPokemonCount();
    }, []);

    return [ pokemonCount,pokemonNames, loading, error ];
}