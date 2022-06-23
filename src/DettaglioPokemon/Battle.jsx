import { useEffect, useState } from "react";

function createPokemonState(id, name, hp, moves) {
  return {
    id,
    name,
    hp,
    moves
  };
}

const getRandomPokemon = () => Math.round(Math.random() * 500);

function Battle({ pokemon1 = 1, pokemon2 = 4}){
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, savePokemons] = useState([]);
  const [turn, setTurn] = useState(0);

  const randomPokemons = [pokemon1, pokemon2];

  useEffect(() => {
    if (pokemons.length > 0) return;

    randomPokemons.forEach(pokemon => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res=> res.json())
        .then(json => {
          const hpStat = json.stats.find(item => item.stat.name === "hp");

          const moves = json.moves.map(item => ({
            url: item.move.url, name: item.move.name
          }));

          savePokemons(
            pokemonsArray => [
              ...pokemonsArray,
              createPokemonState(pokemon, json.name, hpStat.base_stat * 10, moves)
            ]
          );
        })
    });

  }, [...randomPokemons]);

  useEffect(() => {
    if (pokemons.length === randomPokemons.length) setIsLoading(false);
  }, [...pokemons, ...randomPokemons]);

  if (isLoading){
    return (
      <h1>Preparazione battaglia in corso</h1>
    )
  }

  const battleContainer = {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between'
  }

  const handleAttack = (sourceIndex) => (power) => {
    let target = sourceIndex === 1 ? 0 : 1;

    savePokemons(pokemons.map(
      (pokemon, targetsIndex) => ({
        ...pokemon, hp: targetsIndex === target
          ? pokemon.hp - power
          : pokemon.hp
      })
    ))

    setTurn(target);
  };

  return(
    <>
      <h1>Inizio battaglia</h1>
      <div className="battle-container" style={battleContainer}>
        {pokemons.map((pokemon, index) => (
          <div key={pokemon.id} className={`pokemon1-container ${index === turn ? "attacking" : ""}`}>
            <h2>{pokemon.name}</h2>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="" />
            <h3>HP rimasti:{pokemon.hp}</h3>
            <ul>
              {pokemon.moves.slice(0, 6).map(
                (move) => (
                  <li key={move.name}>
                    {move.name}: <MovesPokemon onClick={index === turn ? handleAttack(index) : () => null} url={move.url} />
                  </li>)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

function MovesPokemon({url, onClick = () => null}){
  let urlArray = url.split('/');
  const idMoves= urlArray[6];
  const [moveStats, setMoveStats] = useState();
  const [loadingBattle, setLoadingBattle] = useState(true);

  useEffect(()=>{
      fetch(`https://pokeapi.co/api/v2/move/${idMoves}/`)
        .then(res=>res.json())
        .then(json=>{
          setMoveStats(json);
          setLoadingBattle(false);
        })
        .catch(errore=>{
          console.log(errore)
        })
    },[idMoves])

    if (loadingBattle){
        return (
          <h1>Calcolo danni in corso</h1>
        )
    }

    return (
      <b onClick={() => onClick(moveStats.power)}>
        {moveStats.power}
      </b>

    )
}

export default Battle;