import { useEffect, useState } from "react";

export function useFetchPokemonFromID(pokeid) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokeid}`
        );
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    if (pokeid != null) fetchPokemon();
  }, [pokeid]);

  return [pokemon, loading, error];
}

export function useFetchPokemonSpeciesFromID(pokeid) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokeid}`
        );
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    if (pokeid != null) fetchPokemon();
  }, [pokeid]);

  return [pokemon, loading, error];
}
