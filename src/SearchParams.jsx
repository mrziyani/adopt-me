import { useState } from "react";
import Result from "./Result";
import useBreedList from "./useBreedList";
import usePetList from "./usePetList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [submitKey, setSubmitKey] = useState(0);

  const [breeds] = useBreedList(animal);
  const pets = usePetList(animal, breed, location, availableOnly, submitKey);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitKey((k) => k + 1); // trigger fetch
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
            {ANIMALS.map((a) => (
              <option key={a} value={a}>
                {a}
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
