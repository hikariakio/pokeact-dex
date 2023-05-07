import { useEffect, useState } from "react";

function removeTailSlash(site) {
  return site.replace(/\/$/, "");
}
export  function useFetchPokemonGenDetail(genResult) {
  const [genDetails, setGenDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
      async function fetchGenerationApis() {
        try {
          const response = await fetch(removeTailSlash(genResult.url));
          const data = await response.json();
          setGenDetails(data);
          setLoading(false);
        } catch (error) {
          setError(true);
          console.log(genResult);
          setLoading(false);
        }
      }
      if(genResult !== undefined && genResult !== null)
        fetchGenerationApis();

  }, [genResult]);

  return [genDetails,loading,error];
}
