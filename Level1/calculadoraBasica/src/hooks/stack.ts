class Stack<T> {
    private elements: T[] = [];

    constructor(initialElements: T[] = []) {
      this.elements = initialElements;
    }
  
    // Agrega un elemento a la cima de la pila
    push(element: T): void {
      this.elements.push(element);
    }
  
    // Remueve y retorna el elemento de la cima
    pop(): T | undefined {
      return this.elements.pop();
    }
  
    // Observa el elemento en la cima sin removerlo
    peek(): T | undefined {
      return this.elements[this.elements.length - 1];
    }
  
    // Verifica si la pila está vacía
    isEmpty(): boolean {
      return this.elements.length === 0;
    }
  
    // Tamaño de la pila
    size(): number {
      return this.elements.length;
    }
  
    // Limpiar la pila
    clear(): void {
      this.elements = [];
    }

    // Método para clonar elementos
    toArray(): T[] {
      return [...this.elements];
    }
  
    // Opcional: Convertir a string (para mostrar contenido)
    toString(): string {
      return this.elements.join(", ");
    }
  }

  export default Stack