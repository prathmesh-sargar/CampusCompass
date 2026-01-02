import Calendar from '../Components/QuestionTracker/Calendar'
import React from 'react'

function EventTracker() {
    return (
        <div className="flex flex-row pt-20 justify-center bg-black min-h-screen ">
            
            <div className='w-full'>
                <Calendar />

            </div>
        </div>
    )
}

export default EventTracker
