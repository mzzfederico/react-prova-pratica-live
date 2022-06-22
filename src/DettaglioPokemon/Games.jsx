import { usePokemonGames } from "./pokemonContext";
import { Link } from "react-router-dom";

export default function PokemonGames() {
    const games = usePokemonGames();

    return (
        <ul>
            {games.map(game => (
                <Link key={game.version.name} to={`/games/${game.version.name}`}>
                    <li>
                        {game.version.name}
                    </li>
                </Link>
            ))}
        </ul>
    );
}