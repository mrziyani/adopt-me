export const Pet = ({name, breed, animal, location, images = []} ) => {
    const heroImage = images.length ? images[0] : "https://placehold.co/300"
    return (
        <div className="pet">
            <div className="image-container">
                <img src={heroImage} alt = {animal}></img>
            </div>
            <div className="info">
                <h2>{name} </h2>
                <h3>{animal} - {breed}</h3>
                <p>{location}</p>
            </div>   
        </div>
    )
}