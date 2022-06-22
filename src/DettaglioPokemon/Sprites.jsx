import { useState } from "react";
import { usePokemonSprites } from "./pokemonContext";

export default function PokemonSprites() {
    const sprites = usePokemonSprites();
    const [count, setCount] = useState(0);

    const spritesKeys = Object.keys(sprites).filter(
        key => typeof sprites[key] === "string"
    );

    const currentKey = spritesKeys[count];
    const currentSprite = sprites[currentKey];

    return (
        <img
            src={currentSprite}
            alt={"Immagine"}
            onClick={() => setCount(value => {
                value = value + 1;
                if (spritesKeys.length === value) value = 0;
                return value;
            })} />
    )
}