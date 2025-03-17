import React, { Dispatch, useState } from "react";
import Stack from "./stack";
import * as math from "mathjs";
import useHistory from "./useHistory";



interface CalculatorProps {
    input:  Stack<string | number>;
    setInput:  Dispatch<React.SetStateAction<Stack<string | number>>>;
    setResult: Dispatch<React.SetStateAction<string>>;
    history: string[];
    setHistory: Dispatch<React.SetStateAction<string[]>>;
}

export default function useCalculator({input, setInput, setResult, history, setHistory}: CalculatorProps) {

    const isOperator = new Set(["/", "*", "-", "+", "xⁿ", "=", "(", ")" ]) // Lista de operadores
    const isFunc = new Set(["sin", "cos", "tan", "log", "exp", "sqrt", "π", "e", "1/x",]);
    const decimal = ".";
    
    const [decimalFlag, setDecimalFlag] = useState<boolean>(false);
    const { addToHistory } = useHistory({history, setHistory});

   
    
    const handleClick = (value: string | number) => {

        if(input.isEmpty() && value === "("){
          setInput(() => {
            const newStack = new Stack<string | number>();
            newStack.push(value);
            return newStack;
          });
          return;
        }


          // Si el input esta vacio y el primer  valor es un operador 
          if(input.isEmpty() && isOperator.has(String(value))){
            return;
          }


          // Agregar
          if(input.isEmpty() && value === decimal){
            setInput(() => {
              const newStack = new Stack<string | number>();
              newStack.push(0);
              newStack.push(value);
              setDecimalFlag(true);
              return newStack;
            });
            return;
          }

          const lastElement = input.peek();

          // No puede a ver dos operadores seguidos
          if (
            isOperator.has(String(lastElement)) && 
            isOperator.has(String(value)) && 
            lastElement !== "(" && 
            lastElement !== ")"
          ) {
            return;
          }

          // No puede a ver dos funciones seguidos ejem: sinsin
          if (isFunc.has(String(lastElement))  && isFunc.has(String(value))){
            return;
          }

          //controlar que no se metan mas de un punto decimal por orerando
          if (value === decimal && decimalFlag === true){
            return;
          }

          if (isOperator.has(String(value))){
            setDecimalFlag(false);
          }

          if (value === decimal){
            setDecimalFlag(true);
          }

          if(isOperator.has(String(lastElement)) && value === decimal){
            setInput((prev) => {
              const newStack = new Stack<string | number>();
              prev.toArray().forEach((el) => newStack.push(el));
              newStack.push(0);
              newStack.push(value);
              setDecimalFlag(true);
              return newStack;
            });
            return;
          }

          // Manejo de fracciones
          if(typeof value === "string" && value === "1/x"){
            setInput((prev) => {
              const newStack = new Stack<string | number>();
              prev.toArray().forEach((el) => newStack.push(el)); // Clonar
              newStack.push(1)
              newStack.push('/')
              newStack.push('x');
              return newStack;
            })
            return;
          }

          // Manejo de potencia 
          if(typeof value === "string" && value === "xⁿ"){
            setInput((prev) => {
              const newStack = new Stack<string | number>();
              prev.toArray().forEach((el) => newStack.push(el)); // Clonar
              newStack.push("^")
              newStack.push('x');
              return newStack;
            });
            return;
          }

          // Manejo de pi
          if(typeof value === "string" && value === "π"){
            setInput((prev) => {
              const newStack = new Stack<string | number>();
              prev.toArray().forEach((el) => newStack.push(el)); // Clonar
              newStack.push("pi")
              return newStack;
            });
            return;
          }

          setInput((prev) => {
            const newStack = new Stack<string | number>();
            prev.toArray().forEach((el) => newStack.push(el)); // Clonar
            newStack.push(value);
            return newStack;
          });
      };
    
      const clearInput = () => {
        setInput(new Stack<string|number>())
      };

      const clearResult = () => {
        setResult("");
      }
    
      const calculateResult = () => {
        try{
          const expresion = input.toArray().join("");
          if (!expresion) throw new Error("Expresión vacía");
          const formattedResult = new Intl.NumberFormat().format(math.evaluate(expresion).toString());
          setResult(formattedResult);
          
          // Guardamos hitorial
          addToHistory(`${input.toArray().join("")} = ${formattedResult}`);

        } catch{
          setResult("Syntax Error");
        }
      };

       
    
      const handleBackSpace = () => {
        // Crear una nueva pila con el constructor
        const elementos = input.toArray();
        // Crear una nueva pila con los elementos actuales
        const nuevaPila = new Stack<string | number>([...elementos])
        nuevaPila.pop();
        setInput(nuevaPila);

      };
    
      const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
          const { key } = event;

          // 1.- Validar teclas permitidas
          const esNumero = /^\d$/.test(key); // Solo dígitos 0-9
          const esOperador = "+-*/()".includes(key);
          const esDecimal = key === ".";
          const esTeclaPermitida = esNumero || esOperador || esDecimal;

          if (!esTeclaPermitida && key !== "Enter" && key !== "Escape" && key !== "Backspace") {
            return; // Ignorar teclas no permitidas
          }

          event.preventDefault(); // Evitar comportamiento por defecto (ej: scroll con flechas)

          // 2. Manejar teclas especiales (Enter, Escape, Backspace)
          if (key === "Enter") {
            calculateResult();
            return;
          } else if (key === "Escape") {
            clearInput();
            return;
          } else if (key === "Backspace") {
            handleBackSpace();
            return;
          }
          
          // Si el input esta vacio y el primer  valor es un operador 
          if(input.isEmpty() && isOperator.has(key)){
            return;
          }

          // Agregar
          if(input.isEmpty() && key === decimal){
            setInput(() => {
              const newStack = new Stack<string | number>();
              newStack.push(0);
              newStack.push(key);
              setDecimalFlag(true);
              return newStack;
            });
            return;
          }

          const lastElement = input.peek();

          // No puede a ver dos operadores seguidos
          if (isOperator.has(String(lastElement)) && isOperator.has(key)){
            return;
          }

          //controlar que no se metan mas de un punto decimal por orerando
          if (key === decimal && decimalFlag === true){
            return;
          }

          if (isOperator.has(key)){
            setDecimalFlag(false);
          }

          if (key === decimal){
            setDecimalFlag(true);
          }
          
          if(isOperator.has(String(lastElement)) && key === decimal){
            setInput((prev) => {
              const newStack = new Stack<string | number>();
              prev.toArray().forEach((el) => newStack.push(el));
              newStack.push(0);
              newStack.push(key);
              setDecimalFlag(true);
              return newStack;
            });
            return;
          }

          setInput((prev) => {
            const newStack = new Stack<string | number>();
            prev.toArray().forEach((el) => newStack.push(el)); // Clonar
            newStack.push(key);
            return newStack;
          });
      };

      const handleClickButton = (item: string | number) => {
        if (item === "="){
          calculateResult();
        } else if (item === "C"){
          clearInput();
        } else if (item === 'AC'){
          clearInput();
          clearResult();
        } else {
          handleClick(item);
        }

      }
    

    return {
        handleClick,
        handleKeyDown,
        isOperator,
        handleClickButton
    }
}
