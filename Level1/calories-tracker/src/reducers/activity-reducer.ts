import { Activity } from '../types/types';

// Aqui definimos las acciones para manejar el estado de momento solo se gyrada una actividad
export type ActivityActions = 
{ type: 'save-activity', payload: {newActivity: Activity} } |
{ type: 'set-activeId', payload: {id: Activity['id']} } |
{type: 'delete-activeId', payload: {id: Activity['id']}} |
{type: 'restart-app'}

// El estado al que podemos acceder 
export type ActivityState = {
    activities : Activity[],
    activeId: Activity["id"]
}

const localStorageActivities = (): Activity[] => {
    const activiites = localStorage.getItem('activities')
    return activiites ? JSON.parse(activiites): []
}

//  EL estado inicial 
export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

// El manejo de las actividades
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions) => {

        if(action.type === 'save-activity'){
            // Este codigo maneja la logica para actualizar el state
            let updateActivities: Activity[] = []
            if(state.activeId){
                updateActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : 
                    activity
                )
            } else{
                updateActivities = [...state.activities, action.payload.newActivity]
            }
            
            return {
                ...state,
                activities: updateActivities,
                activeId: ''
            }
        } 
        
        if ( action.type === 'set-activeId' ){
            return {
                ...state,
                activeId: action.payload.id,
            }
        }


        if(action.type === 'delete-activeId'){
            return{
                ...state,
                activities: state.activities.filter(acivity => acivity.id != action.payload.id)
            }
        }

        if(action.type === 'restart-app'){
            return{
                activities: [],
                activeId: ''
            }
        }

    return state
    
} 