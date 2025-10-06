import { useState, useEffect } from "react";
import Result from "./Result";
 
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
 
const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [pets, setPets] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
 
  // ⚡️ Charger les animaux au montage et quand l’animal change
  useEffect(() => {
    loadPets();
  }, [animal]);
 
  // 🔁 Charger les races quand on change d’animal
  useEffect(() => {
    if (!animal) {
      setBreeds([]);
      return;
    }
    loadBreeds();
  }, [animal]);
 
  // 🔹 Fonction pour charger la liste des animaux (avec filtres)
  async function loadPets() {
    setLoading(true);
    let url = "http://localhost:3001/pets?";
    const params = [];
 
    if (animal) params.push(`animal=${animal}`);
    if (breed) params.push(`breed=${breed}`);
    if (location) params.push(`city=${location.split(",")[0].trim()}`);
    if (availableOnly) params.push(`available=${availableOnly}`);
 
    url += params.join("&");
 
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPets(data || []);
    } catch (err) {
      console.error("Erreur lors du chargement des animaux :", err);
    } finally {
      setLoading(false);
    }
  }
 
  // 🔹 Fonction pour charger les races
  async function loadBreeds() {
    try {
      const response = await fetch("http://localhost:3001/breeds");
      const data = await response.json();
      setBreeds(data[animal] || []);
    } catch (err) {
      console.error("Erreur lors du chargement des races :", err);
      setBreeds([]);
    }
  }
 
  if (loading) {
    return <h2>Chargement des animaux...</h2>;
  }
 
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loadPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
 
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option value="">All Animals</option>
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
 
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            disabled={!animal}
          >
            <option value="">All Breeds</option>
            {(breeds || []).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
 
        <label className="checkbox-label" htmlFor="availableOnly">
          <input
            type="checkbox"
            id="availableOnly"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />
          Available Only
        </label>
 
        <button type="submit">Search</button>
      </form>
 
      <Result pets={pets} />
    </div>
  );
};
 
export default SearchParams;
