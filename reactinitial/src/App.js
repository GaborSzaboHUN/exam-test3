import React, { useEffect, useState } from "react"
import Character from "./components/Character"
import LoadingMask from "./components/LoadingMask"
import Subscription from "./components/Subscription"

const App = () => {

    const [characters, setCharacters] = useState(null)
    const [delayedComponent, setDelayedComponent] = useState(false)


    // - - - - First loading fetch
    useEffect(() => {
        const characters = async () => {
            const response = await fetch(`https://demoapi.com/api/series/howimetyourmother`);
            const data = await response.json();
            setCharacters(data)
        }
        characters()
    }, [])


    // - - - - Subscription delay setup
    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedComponent(true)
        }, 10000);
        // - - - -Leállítjuk a számlálót
        return () => {
            clearTimeout(timer)
        }
    }, []);

    // - - - - Eltüntetjük a Subsciption componenst
    const pullData = (data) => {
        if (data !== "") {
            setTimeout(() => {
                setDelayedComponent(false)
            }, 5000)
        }
    }

    return (
        <div>
            <h1>Series Api</h1>
            {
                characters ? characters.map((character, index) => <Character key={index} name={character.name} details={character.details} />) : <LoadingMask />
            }

            {delayedComponent && <Subscription childParentCommunication={pullData} />}

        </div>
    )
}

export default App
