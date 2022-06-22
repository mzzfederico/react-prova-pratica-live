import './App.css';
import Todo from '../Todo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DettaglioPokemon from '../DettaglioPokemon';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/todo" element={<Todo />} />
            <Route path="/pokemon/:pokemon" element={<DettaglioPokemon />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
