import { checkPropTypes } from "prop-types";
import { useEffect, useState } from "react"

export default function EsempioPropsChildren() {
    const getIdFromUrl = string => string.split("/").filter(s => s).at(-1);

    return (
        <>
            <div style={{width: "300px", height: "300px"}}>
                <ProviderAPI url={"https://pokeapi.co/api/v2/pokemon/pikachu"}>
                    {({ loading, json }) => (
                        <>
                            {loading && <h3>Caricamento...</h3>}
                            {!loading && <span>{json.name}</span>}
                        </>
                    )}
                </ProviderAPI>
            </div>
            <div style={{display: "flex", flexDirection: 'row'}}>
                <ProviderAPI url={"https://pokeapi.co/api/v2/pokemon"}>
                    {({ loading, json }) => (
                        <>
                            {loading && <h3>Caricamento...</h3>}
                            {!loading && json.results.map(
                                pokemon => <img alt={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} />
                            )}
                        </>
                    )}
                </ProviderAPI>
            </div>
        </>
    )
}

const Card = ({ header, children, footer }) => (
    <div className="card">
        <header>
            {header}
        </header>
        <body>
            {children}
        </body>
        <footer>
            {footer}
        </footer>
    </div>
)

function ProviderAPI({ url = "", children, renderComponent = ({loading, json}) => null }) {
    const [json, pokemonJson] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(json => {
                pokemonJson(json);
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            });
    }, []);

    if (typeof children !== "function") return null;

    return (
        <div>
            {children({loading, json})}
        </div>
    )
}




/* Esempio  */
export function EsempioChildrenDiretto() {
    return (
        <Titolo><TestoEffetto testo={"hello world"} /></Titolo>
    )
}

function TestoEffetto({ testo }) {
    alert("rerender");

    return testo;
}

function Titolo({ children }) {
    /////const [counter, setCounter] = useState(0);
    const [text, setText] = useState("");

    return <div className="titolo">
         <h1>{children}</h1>
        {/* OK: <h1>{children}</h1> */}
        {/* NO: <h1><TestoEffetto testo={"hello world"} /></h1> */}

        {/* <h3 onClick={() => setCounter(i => i + 1)}>{counter}</h3> */}
        <input type="email" name="text" id="text" onChange={e => setText(e.target.value)} value={text} />
    </div>
}