import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Form from './components/Form';

function App() {
  

  return (
    <>
      <header className='header py-3'>
        <div className='container-md d-flex justify-content-between'>
          <h1 className='text-center text-lg fw-bold text-white uppercase'>
            Contador de calorias
          </h1>
        </div>
      </header>
      <section className='section_formulario py-5 px-3'>
        <div className='container-md mx-auto'>
          <Form/>
        </div>
      </section>
    </>
  )
}

export default App
