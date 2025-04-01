import { Dispatch, useMemo } from 'react';
import { categories } from '../data/data';
import { Activity } from '../types/types';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ActivityActions } from '../reducers/activity-reducer';

 

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}


export default function ActivityList({activities, dispatch}: ActivityListProps) {
  
    const categoryName = useMemo(() => 
    (category: Activity['category']) =>
        categories.map( cat => cat.id === category ? cat.name : ''),
    [activities])


    return(
        <>
            <h2 className='fs-1 fw-bold text-muted text-center'>Comida y actividades </h2>

            {activities.length === 0 ? <p className='text-center fs-2'>No has registrado ninguna actividad</p> : 
            activities.map((activity) => (
                <div key={activity.id} className='rounded-lg py-5 px-5 mt-5 bg-white d-flex justify-content-between'>
                    <div className='position-relative mb-2'>
                        <p className={`position-absolute text-white text-uppercase fw-bold ${activity.category === 1 ? 'comida' : 'ejercicio'}`}>
                            {categoryName(+activity.category)}
                        </p>
                        <p className='fs-2 fw-bold pt-5'>{activity.name}</p>
                        <p className='activity_calories fs-1'>{activity.calories}{' '}
                            <span>Calorias</span>
                        </p>
                    </div>

                    <div className="d-flex align-items-center">
                        <button className="btn btn-light"
                            onClick={() => dispatch({type: 'set-activeId', payload: {id: activity.id}})}
                        >
                        <i className="bi bi-pencil fs-2 text-dark"></i>
                        </button>
                        <button className="btn btn-danger ms-3"
                            onClick={() => dispatch({type: 'delete-activeId', payload: {id: activity.id}})}
                        >
                            <i className="bi bi-trash fs-2"></i> {/* Icono de eliminar */}
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
