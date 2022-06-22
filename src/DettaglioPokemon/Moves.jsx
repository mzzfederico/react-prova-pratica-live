import { usePokemonMoves } from "./pokemonContext";

export default function PokemonMoves(){
    const moves = usePokemonMoves();

    return (
        <ul>
            {moves.map(el=><li key={el.move.url}>{el.move.name}</li>)}
        </ul>
    )
}