
import { useMemo } from 'react'
import { Activity } from '../types/types'

type calorieTrackerProp = {
    activities: Activity[]
}

export default function CalorieTracker({activities}: calorieTrackerProp) {
  // Contadores
  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total  + 
  activity.calories : total, 0) , [activities]);

  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total  + 
  activity.calories : total, 0) , [activities]);

  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities]);

  return (
    <>
        <h2 className='fw-bold text-white fs-1 text-center'>Resumen de Calorias</h2>
        <div className='d-flex flex-column align-items-center flex-md-row justify-content-md-between custom-gap custom-mt container'>
          <p className='text-white fw-bold f-1 text-center d-grid gap-3 '>
            <span className='fw-bold calories_number '>{caloriesConsumed}</span>
            Consumidas
          </p>

          <p className='text-white fw-bold f-1 text-center d-grid gap-3 '>
            <span className='fw-bold calories_number '>{netCalories}</span>
            Balance
          </p>

          <p className='text-white fw-bold f-1 text-center d-grid gap-3 '>
            <span className='fw-bold calories_number '>{caloriesBurned}</span>
            Ejercicios
          </p>
        </div>
       
    </>
  )
}
