import { useEffect, useState } from "react";

export default function usePetList(animal, breed, location, availableOnly, submitKey) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (!submitKey) return; // only fetch after submit

    const params = [];
    if (animal) params.push(`animal=${encodeURIComponent(animal)}`);
    if (breed) params.push(`breed=${encodeURIComponent(breed)}`);
    if (location) {
      const city = location.split(",")[0].trim();
      if (city) params.push(`city=${encodeURIComponent(city)}`);
    }
    if (availableOnly) params.push(`available=${availableOnly}`);

    const query = params.join("&");
    const url = `http://localhost:3001/pets${query ? `?${query}` : ""}`;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (!cancelled) {
          setPets(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("Error loading pets:", e);
        if (!cancelled) setPets([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [submitKey]);

  return pets;
}
