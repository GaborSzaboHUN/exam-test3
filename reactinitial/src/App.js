import React, { useEffect, useState } from "react"
import Character from "./components/Character"
import LoadingMask from "./components/LoadingMask"
import Subscription from "./components/Subscription"

const App = () => {

  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    const characters = async () => {
      const response = await fetch(`https://demoapi.com/api/series/howimetyourmother`);
      const data = await response.json();
      setCharacters(data)
    }
    characters()
  }, [])

  return (
    <div>
      <h1>Series Api</h1>
      {
        characters ? characters.map((character, index) => <Character key={index} name={character.name} details={character.details} />) : <LoadingMask />
      }

      <Subscription />

    </div>
  )
}

export default App
