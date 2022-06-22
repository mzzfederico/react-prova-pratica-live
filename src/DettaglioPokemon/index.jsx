
import { PokemonProvider } from "./pokemonContext";
import PokemonStats from "./Stats";
import PokemonMoves from "./Moves";
import PokemonSprites from "./Sprites";
import PokemonGames from "./Games";

export default function DettaglioPokemon() {

    /*
        Creiamo la pagina con la lista dei pokemon
        la pagina tiene un contatore nello stato per la pagina
        la pagina parte da 1 e aumenta...
        passiamo alla richiesta 1 moltiplicato per il numero di pokemon (offset)
        stampiamo i pokemon in pagina con l'immagine:
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/<ID DEL POKEMON></ID>.png
        i componenti dei pokemon, ognuno linkano alla pagina di dettaglio
        ... aggiungiamo link alla pagina con la lista

        BONUS: se salvate il numero di pagina nell'URL, usando useParams, rotta in Routes con :pagina...
    */

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