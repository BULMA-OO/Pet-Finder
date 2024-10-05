import Pet from "./Pet";

const Result = ({ pets }) => {
  return (
    <>
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              id={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={pet.breed}
              images={pet.images}
              location={pet.city + ", " + pet.state}
              key={pet.id}
            />
          );
        })
      )}
    </>
  );
};

export default Result;
