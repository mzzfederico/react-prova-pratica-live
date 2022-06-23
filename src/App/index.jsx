import './App.css';
import Todo from '../Todo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DettaglioPokemon from '../DettaglioPokemon';
import ClassComponentTodo from '../EsempioClassComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/class" element={<ClassComponentTodo hello={"ciao"} />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/pokemon/:pokemon" element={<DettaglioPokemon />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
