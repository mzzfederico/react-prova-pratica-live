import { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

const pokemonContext = createContext();

// https://pokeapi.co/api/v2/pokemon/[POKEMON_DA_CERCARE]

export const PokemonProvider = ({ children }) => {
    const [isCorrect, setIsCorrect] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonState, setPokemonState] = useState({});

    const params = useParams();
    const pokemon = params.pokemon;

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setIsLoading(false);
                setPokemonState(json);
                setIsCorrect(true);
            })
            .catch(err => {
                setIsCorrect(false);
            })
    }, [pokemon]);

    const value = {
        isLoading,
        isCorrect,
        pokemon: pokemonState
    }

    return (
        <pokemonContext.Provider value={value}>
            {children}
        </pokemonContext.Provider>
    )
}

export const usePokemonStats = () => {
    const contextValue = useContext(pokemonContext);
    const pokemon = contextValue.pokemon;

    if (pokemon.stats) return pokemon.stats;
    return [];
}

export const usePokemonMoves = () =>{
    const contextValue = useContext(pokemonContext);
    const pokemon = contextValue.pokemon;

    if (pokemon.moves) return pokemon.moves;
    return [];
}

export const usePokemonSprites = () => {
    const contextValue = useContext(pokemonContext);
    const pokemon = contextValue.pokemon;

    if (pokemon.sprites) return pokemon.sprites;
    return {};
}

export const usePokemonGames = () => {
    const contextValue = useContext(pokemonContext);
    const games = contextValue.pokemon.game_indices || [];

    return games;
}