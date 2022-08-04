import {useState, useEffect} from 'react'

export default function CountdownTimer({candyMachine, dropDate}){
    const [timerString, setTimerString] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date().getTime()
            const distance = dropDate - currentDate

            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)

            setTimerString(`${days}d ${hours}h ${minutes}m ${seconds}s`)

            if(distance < 0){
                clearInterval(interval)
            }
        }, 1000)

        return () => {
            if(interval){
                clearInterval(interval)
            }
        }
    }, [])

    return(
        <div>
            {timerString}
        </div>
    )
}