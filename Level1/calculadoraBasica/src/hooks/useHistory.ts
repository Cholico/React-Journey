import { useEffect} from 'react'


interface HistoryProps {
    history: string[];
    setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  }

export default function useHistory({history, setHistory}: HistoryProps) {
    
    // Cargar historial desde local storage
    useEffect(() => {
        const savedHistory = localStorage.getItem("calcHistory");
        if (savedHistory){
            setHistory(JSON.parse(savedHistory));
        }
    }, [setHistory]);

    // Guardamos el historial en LocalStorage
    useEffect(() => {
        localStorage.setItem("calcHistory", JSON.stringify(history));
    }, [history])
  
    // Agregar operacion al historial
    const addToHistory = (operacion: string) =>{
        setHistory((prev) => [...prev, operacion])
    };

    // Borrar historial
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("calcHistory");
    };
  
    return { history, addToHistory, clearHistory}
}
