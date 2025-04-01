import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Form from './components/Form';
import { useReducer, useEffect } from 'react';
import { activityReducer, initialState } from './reducers/activity-reducer';
import ActivityList from './components/ActivityList';
import CalorieTracker from './components/CalorieTracker';


function App() {
  
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  return (
    <>
      <header className='header py-3'>
        <div className='container-md d-flex justify-content-between'>
          <h1 className='text-center text-lg fw-bold text-white uppercase'>
            Contador de calorias
          </h1>
          <button 
            type="reset" className="btn"
            onClick={() => dispatch({type: 'restart-app'})}
          >
            <i className="bi bi-arrow-clockwise  fs-1 text-white"></i>
          </button>
        </div>
      </header>
      <section className='section_formulario py-5 px-3'>
        <div className='container-md mx-auto'>
          <Form
            dispacth={dispatch}
            state={state}
          />
        </div>
      </section>
      <section className='mx-auto '>
        <div className='stats p-5'>
            <CalorieTracker
              activities={state.activities}
            />
        </div>
      </section>

      <section className="container p-4 mx-auto" style={{ maxWidth: "64rem" }}>
          <ActivityList
            activities = {state.activities}
            dispatch={dispatch}
          />
          
      </section>

    </>
  )
}

export default App
