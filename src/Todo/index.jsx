import React, {useState} from 'react';

/**
 * Componente che permette l'inserimento di todo...
 * @returns Componente Todo
 */
export default function Todo() {
  const [todos, setTodos] = useState([
    newTodo("Lorem ipsum"),
  ])
  const [text,setText] = useState("");

  function handlerTodos(e){
    if (e.key==='Enter'){
      setTodos( prevTodos => prevTodos.concat( newTodo(text)) );
      setText("");
    }
  }

  function completeTodo(id) {
    setTodos(prevTodos => prevTodos.map(el => {
      if (el.id === id) {
        el.isComplete = !el.isComplete;
      }
      return el
    }))
  }

	function deleteHandler(id) {
    setTodos(prevTodo => prevTodo.filter(item => item.id !== id));
	}

	function addTodo() {
		if (text.length > 0) {
      setTodos(prevTodos => prevTodos.concat(newTodo(text)));
      setText("");
    }
	}

  return(
    <>
      <input
        type="text"
        onKeyDown={handlerTodos}
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button
        disabled={text.length === 0}
        onClick={() => { addTodo() }}>Inserisci todo</button>

      <ul>
        {todos.map(
          elem => <li className='todo-item' key={elem.id}>
            <a onClick={() => completeTodo(elem.id)} href="#">{elem.text}</a>
            <b>{elem.isComplete && "ok"}</b>
            <TastoElimina onClick={() => deleteHandler(elem.id)} />
          </li>
        )}
      </ul>
    </>
  )
}

function TastoElimina({ onClick }) {
  return <span onClick={onClick}>X</span>
}

/**
 * Crea un oggetto con le informazioni del todo e il testo inserito dall'utente
 * @param {string} text contenuto del todo
 * @returns Oggetto del todo
 */
function newTodo(text) {
  return {
    text,
    id: Date.now(),
    isComplete: false
  }
}

function funzioneQualsiasi(stringa = "", number = 0, object = {}) {
  return number++;
}