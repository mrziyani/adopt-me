import './App.css'
import { Pet } from './Pet'
import Result from './Result'
import SearchParams from './SearchParams';

function App() {
  const pets = [
    {
      id: 1,
      name: "Buddy",
      animal: "Dog",
      breed: "Golden Retriever",
      images: ["https://placedog.net/400/300?id=1"],
      city: "Seattle",
      state: "WA"
    },
    {
      id: 2,
      name: "Whiskers",
      animal: "Cat",
      breed: "Siamese",
      images: ["https://placecats.com/300/200"],
      city: "Portland",
      state: "OR"
    },
    {
      id: 3,
      name: "Coco",
      animal: "Bird",
      breed: "Parrot",
      images: ["https://www.egretta.org/portfolio/lar/Buteo_buteo_01.jpg"],
      city: "San Francisco",
      state: "CA"
    }
  ];

  return (
    <>
      <SearchParams></SearchParams>
      <h1>Adopt me!</h1>
      <p>Find your perfect pet</p>
      <Result pets={pets} />

    </>
  )
}

export default App
