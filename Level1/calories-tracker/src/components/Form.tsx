import { useState, ChangeEvent, Dispatch, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import { categories } from "../data/data";
import { Activity } from "../types/types";
import { ActivityActions,  ActivityState } from '../reducers/activity-reducer';


type FormProps = {
    dispacth: Dispatch<ActivityActions>,
    state: ActivityState,
}

const initial: Activity= {
    id : uuidv4(),
    category: 1,
    name: '',
    calories: 0,
}

export default function Form({dispacth, state}: FormProps) {

    const [activity, setActivity] = useState<Activity>(initial);

    useEffect(() => {
        if(state.activeId) {
           const selectedActivity = state.activities.filter((stateActivity) => stateActivity.id === state.activeId)[0]
           setActivity(selectedActivity);
        }
    }, [state.activeId]
);

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);


        setActivity((prev) => ({
            ...prev,
            [e.target.id]: isNumberField ? + e.target.value : e.target.value
        }));

    }

    const isAvailableToSend = () =>{
        const {name, calories} = activity;

        return name.trim() !== '' && calories > 0; 
        
    }

    const handleChangeForm = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        dispacth({type: 'save-activity', payload: {newActivity: activity}})

        setActivity({
            ...initial,
            id: uuidv4()
        })
    }


    return (
        <form 
            className="d-flex flex-column gap-3 bg-white shadow-lg  p-5 rounded"
            onSubmit={handleChangeForm}
        >
            <div className="row gap-3">
                <label htmlFor="category" className="fs-4 fw-bold">Categoria</label>
                <select 
                    name="" 
                    id="category"
                    className="border border-secondary p-2 rounded w-100 bg-white fs-3"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map((categorie) => (
                        <option
                            className="fs-3" 
                            key={categorie.id}
                            value={categorie.id}
                        >
                            {categorie.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="row gap-3">
                <label htmlFor="name" className="fs-4 fw-bold">Actividad</label>
                <input 
                    type="text"
                    id="name"
                    className="border border-secondary p-2 rounded w-100 bg-white fs-3"
                    placeholder="Ej. comida, bicicleta, jujitsu, postre etc.."
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="row gap-3">
                <label htmlFor="calories" className="fs-4 fw-bold">Calorias</label>
                <input 
                    name="" 
                    id="calories"
                    className="border border-secondary p-2 rounded w-100 bg-white fs-3"
                    placeholder="Ingresar calorias"
                    type="number"
                    value={activity.calories}
                    onChange={handleChange}
                /> 
            </div>

            <input 
                type="submit"
                className={`form_btn ${!isAvailableToSend() ? "opacity-25" : ""}`}  
                disabled={!isAvailableToSend()}
                value={activity.category === 1 ? "Registrar comida" : "Guardar ejercicio"} 
            />
        </form>
    )
}
