import { usePokemonStats } from "./pokemonContext";

export default function PokemonStats () {
    const stats = usePokemonStats();

    return (
        <ul>{
            stats.map(item => <li key={item.stat.name}>{item.stat.name}: {item.base_stat}</li>)
        }</ul>
    )
}