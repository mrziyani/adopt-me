import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
/* import { URL } from "./constants";
 */
const Details = () => {
  let url = "http://localhost:3001/pets?";
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(1);

  useEffect(() => {
    loadPet();
  }, [id]);

  async function loadPet() {
    setLoading(true);
    try {
      const res = await fetch(`${url}/pets/${id}`);
      let data = await res.json();

      if (Array.isArray(data)) {
        data = data.find(p => String(p.id) === String(id)) ?? null;
      }
      console.log(data);
      setPet(data);
    } catch (err) {
      console.error(err);
      setPet(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Loading Pet Details ...</h2>;
  }

  if (!pet) {
    return <h2>No Pet Found</h2>;
  }

  return (
    <div className="details">
      <div className="carousel">
        <img
/*           {console.log(pet)}
 */          src={pet.images[selectedImage]}
          alt={pet.name}
          srcSet=""
        />
        <div className="carousel-thumbnails">
          {pet.images.map((image, index) => (
            <img
              src={image}
              key={image}
              alt={pet.name}
              className={index === selectedImage ? "active" : ""}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="pet-details">
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} — {pet.breed}
        </h2>
        <h3>
          {pet.city}, {pet.state}
        </h3>
        <p>{pet.description}</p>
        <button className="adopt-button">Adopt {pet.name}</button>
      </div>
    </div>
  );
};

export default Details;
