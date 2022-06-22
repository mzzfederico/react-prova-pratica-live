
import { PokemonProvider } from "./pokemonContext";
import PokemonStats from "./Stats";
import PokemonMoves from "./Moves";
import PokemonSprites from "./Sprites";
import PokemonGames from "./Games";

export default function DettaglioPokemon() {
    return (
        <PokemonProvider>
            <div className="pokemon">
                <PokemonSprites />
                <PokemonStats />
                <PokemonMoves />
                <PokemonGames />
            </div>
        </PokemonProvider>
    );
}