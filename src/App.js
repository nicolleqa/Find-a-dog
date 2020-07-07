import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function SelectBreed({ options, chooseBreed }) {
  const handleSelectBreed = (event) => {
    chooseBreed(event.target.value);
  };
  return (
    <select
      name="dog-breeds"
      className="dog-breeds"
      onChange={handleSelectBreed}
    >
      <option value="">Select a breed</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function ListRandom({ randomImages }) {
  return (
    <div className="random-dogs-container">
      {randomImages.map((image, index) => (
        <img src={image} alt="cute dog" key={index} className="dog-image" />
      ))}
    </div>
  );
}

function ListBreed({ breedImages }) {
  return (
    <div className="dogs-breeds-container">
      {breedImages.map((image, index) => (
        <img src={image} alt="cute dog" key={index} className="dog-image" />
      ))}
    </div>
  );
}

function Load() {
  return (
    <div className="loading-container">
      <div className="pre-loader"></div>
      <p className="loading">Loading...</p>
    </div>
  );
}
function DogPage() {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [breed, setBreed] = useState("");
  const [randomDogs, setRandomDogs] = useState([]);
  const [imageBreedDog, setImageBreedDog] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDogBreeds = async () => {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");

      const data = await response.json();
      setDogBreeds(Object.keys(data.message));
    };
    fetchDogBreeds();
  }, []);

  useEffect(() => {
    const fetchRandomImages = async () => {
      const response = await fetch(
        "https://dog.ceo/api/breeds/image/random/10"
      );

      const data = await response.json();
      setRandomDogs(data.message);
    };
    fetchRandomImages();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchDogBreed = async (breed) => {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);

      const data = await response.json();
      setImageBreedDog(data.message);
      setLoading(false);
    };

    if (!breed) {
      setLoading(false);
      return;
    }
    fetchDogBreed(breed);
  }, [breed]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">Find a dog</h1>
      </header>
      <div className="select-breeds">
        <SelectBreed options={dogBreeds} chooseBreed={setBreed} />
      </div>

      {breed === "" && <ListRandom randomImages={randomDogs} />}
      {loading ? (
        <Load />
      ) : (
        breed !== "" && <ListBreed breedImages={imageBreedDog} />
      )}
    </div>
  );
}

function App() {
  return <DogPage />;
}

export default App;
