import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { useState } from "react";
import useCalculator from "./hooks/useCalculator";
import Stack from "./hooks/stack";
import { FaHistory } from "react-icons/fa"; // Ícono de historial
import useHistory from "./hooks/useHistory";
import { basicButtons, scientificOps } from './conts/buttons';




function App() {
  const [input, setInput] = useState<Stack<string | number>>(new Stack<string | number>());
  const [result, setResult] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isScientificMode, setIsScientificMode] = useState(false);
  
  // Mis hooks
  const { clearHistory } = useHistory({history, setHistory});
  const {handleKeyDown, isOperator,  handleClickButton} = useCalculator({input, setInput, setResult, history, setHistory});

  

  return (
    <>
      <header className="header d-flex justify-content-between align-items-center p-3">
        <h1 className="mb-0">Calculadora</h1>
    
        
        <div>
          {/* Boton cientifico*/}
          <button className="btn btn-outline-light mx-2 sci-btn" onClick={() => setIsScientificMode(!isScientificMode)}>
            {isScientificMode ? "Básico" : "Científico"}
          </button>

          {/* Boton historial */}
          <button className="btn btn-outline-light history-btn" onClick={() => setShowHistory(!showHistory)}>
            <FaHistory size={24}/>
          </button>
        </div>

        
      </header>

      {/* Historial desplegable*/}
      {showHistory && (
        <div className="history-dropdown">
          <h5>Historial</h5>
          <ul className="list-group">
            {history.length === 0 ? (
              <li className="list-group-item text-muted">No hay operaciones</li>
            ): (
              history.map((operaciones, index) => (
                <li key={index} className="list-group-item text-dark">{operaciones}</li>
              ))
            )}
          </ul>
          {history.length > 0 && (
            <button className="btn btn-warning mt-2 w-100" onClick={clearHistory}>
              Borrar Historial
            </button>
          )}
        </div>
      )}

      <div className="container mt-5 text-center">
        <div className="card p-3 mx-auto calculadora" style={{ maxWidth: "300px" }}>
          <input
            type="text"
            className="form-control text-end display"
            value={input.toArray().join("")}
            readOnly
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <h4 className="mt-3 text-white">{result}</h4>
            <div className={`grid-container ${isScientificMode ? "scientific-mode" : ""}`}>
              {basicButtons.map((item, index) => (
                <button
                  key={index}
                  className={`btn m-1 btn-circle 
                    ${item === "AC" || item === "C" ? "btn-clean text-white" : 
                      isOperator.has(String(item)) ? "btn-operator text-white" : "btn-dark"}`}
                  onClick={() => handleClickButton(item)}
                >
                  {item}
                </button>
              ))}

              {isScientificMode && 
                scientificOps.map((item, index) => (
                  <button
                    key={`sci-${index}`}
                    className={`btn m-1 btn-circle text-white 
                      ${item === "AC" || item === "C" ? "btn-clean" : "btn-operator btn-operator-sci"}`}
                    onClick={() => handleClickButton(item)}
                  >
                    {item}
                  </button>
                ))}
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
