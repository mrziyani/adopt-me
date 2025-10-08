import { useState } from "react";

export default function usePetList() {
  const [pets, setPets] = useState([]);
  const [status, setStatus] = useState("unloaded");

  async function search({ animal, breed, location, availableOnly }) {
    const params = [];
    if (animal) params.push(`animal=${animal}`);
    if (breed) params.push(`breed=${breed}`);
    if (location) params.push(`city=${location.split(",")[0].trim()}`);
    if (availableOnly) params.push(`available=${availableOnly}`);

    const query = params.join("&");
    const url = `http://localhost:3001/pets?${query}`;

    setStatus("loading");
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPets(Array.isArray(data) ? data : []);
      setStatus("loaded");
    } catch (e) {
      console.error("Error loading pets:", e);
      setPets([]);
      setStatus("error");
    }
  }

  return { pets, status, search };
}
