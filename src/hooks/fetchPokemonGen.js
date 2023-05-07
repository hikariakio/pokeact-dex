import { useEffect, useState } from "react";

export function useFetchPokemonGen() {
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGenerations() {
      setLoading(true);
      try {
        const response = await fetch("https://pokeapi.co/api/v2/generation");
        const data = await response.json();
        setGenerations(data.results);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchGenerations();
  }, []);

  return [ generations, loading, error ];
}