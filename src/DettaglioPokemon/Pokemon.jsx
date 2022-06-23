import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Pokemon(){
  const [pokemonJson,setPokemonJson] = useState("");
  const [isLoaded,setIsLoaded] = useState(false);
  const {pokemonTarget} = useParams();
  const [showMoves,setShowMoves] = useState(false);
  
  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonTarget}`)
      .then(res=>res.json())
      .then(json=>{
        setPokemonJson(json);
        setIsLoaded(true);
    })
  },[pokemonTarget])

  if (isLoaded===false){
    return(
      <h1>Caricamento in corso</h1>
    )
  }
  
  function showPokemonMoves(){
    setShowMoves(!showMoves);
  }

  return(
    
    <>
      <h1>{pokemonJson.name}</h1>
      <img src={pokemonJson.sprites.front_default} alt="" />
      <ul>
        {pokemonJson.types.map((el,key)=><li>{el.type.name}</li>)}
      </ul>
      <button type="button" onClick={showPokemonMoves}>{!showMoves && 'Mostra'}{showMoves && 'Nascondi'}</button>
      {showMoves && <ul>
        {pokemonJson.moves.map((el,key)=><li key={key}>{el.move.name}</li>)}
      </ul>}
    </>
    
    
  )
}

export default Pokemon;