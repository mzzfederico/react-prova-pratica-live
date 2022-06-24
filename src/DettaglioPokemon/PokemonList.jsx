import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';


function PokemonList() {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoaded,setIsLoaded] = useState(false);
  const [pokemonList,setPokemonList] = useState([]);
  //const [countPage,setCountPage] = useState (0);

  const styleBtn = {
    width: 100,
    height: 50
  };

  const styleContainerBtn = {
    display: 'flex',
    gap: '5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3%'
  }

  const pageNumber = Number(params.page) || 1;
  
  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${((pageNumber - 1) * 20)}&limit=20`)
      .then(res=>res.json())
      .then(json=>{
        setPokemonList(json);
        setIsLoaded(true);
      })
      .catch(error=>{
        console.log(error);
      })
  },[pageNumber])

  if (!isLoaded){
    return(
      <h1>Caricamento in corso</h1>
    )
  }

  function nextPage() {
    navigate(`/pokemon/page/${pageNumber + 1}`);
  }

  function prevPage(){
    if (pageNumber!==0){
      navigate(`/pokemon/page/${pageNumber - 1}`);
    }
  }

  const extractPokemonId = (url = "") => {
    const path = url.split('/').filter(string => string);
    console.log(path);
    return path.pop();
  };

  return (
    <>
      <ul style={{listStyle: "none"}}>
        {pokemonList.results.map((el, key) => <li key={el.name} style={{display: "inline-block"}}>
          <Link to={`/pokemon/${el.name}`}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonId(el.url)}.png`}
            alt={el.name}
          />
          </Link>
        </li>)}
      </ul>
      <div className="container-btn" style={styleContainerBtn}>
        {pageNumber !== 1 && <button type="button" onClick={prevPage} style={styleBtn}>Prev</button>}
        <span>Pagina:{pageNumber}</span>
        <button type="button" onClick={nextPage} style={styleBtn}>Next</button> 
      </div>
      
    </>
  );
}

export default PokemonList;