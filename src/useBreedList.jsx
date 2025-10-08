import { useEffect, useState } from "react";

const cache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setStatus("unloaded");
      setBreedList([]);
      return;
    }

    if (cache[animal]) {
      setBreedList(cache[animal]);
      return;
    }

    async function loadBreeds() {
      setStatus("loading");
      try {
        const response = await fetch("http://localhost:3001/breeds");
        const data = await response.json();
        cache[animal] = data[animal] ?? [];
        setBreedList(cache[animal]);
        setStatus("loaded");
      } catch (error) {
        console.error("Error loading breeds:", error);
        setStatus("error");
      }
    }

    loadBreeds();
  }, [animal]);

  return [breedList, status];
}
