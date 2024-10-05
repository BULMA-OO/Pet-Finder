import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Result from "./Results";
import fetchSearch from "./fetchSearch";
import useBreedList from "./useBreedList";
import AdoptedPetContext from "./AdoptedPetContext";

const Animal = ["dog", "bird", "cat", "rabbit", "reptile"];

const SearchParams = () => {
  const [rqstParams, setRqstParams] = useState({
    animal: "",
    location: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [Breed] = useBreedList(animal);
  const result = useQuery(["search", rqstParams], fetchSearch);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const pets = result?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.target);
          const obj = {
            animal: fd.get("animal") ?? "",
            location: fd.get("location") ?? "",
            breed: fd.get("breed") ?? "",
          };
          setRqstParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="image-container pet">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" placeholder="location" name="location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {Animal.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={Breed.length === 0} name="breed">
            <option />
            {Breed.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <div className="search">
        {result.isLoading ? <Loader /> : <Result pets={pets} />}
      </div>
    </div>
  );
};

export default SearchParams;
