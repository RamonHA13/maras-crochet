import { useCallback, useEffect, useMemo, useState } from 'react'

export default function useDate() {
  const [time, setTime] = useState<string>()

  const monthsDict = {
    '01': 'Enero',
    '02': 'Febrero',
    '03': 'Marzo',
    '04': 'Abril',
    '05': 'Mayo',
    '06': 'Junio',
    '07': 'Julio',
    '08': 'Agosto',
    '09': 'Septiembre',
    '10': 'Octubre',
    '11': 'Noviembre',
    '12': 'Diciembre'
  }

  const daysDict = {
    '01': 'Lunes',
    '02': 'Martes',
    '03': 'Miércoles',
    '04': 'Jueves',
    '05': 'Viernes',
    '06': 'Sábado',
    '07': 'Domingo'
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date()
      const hour = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const seconds = date.getSeconds().toString().padStart(2, '0')
      setTime(`${hour}:${minutes}:${seconds}`)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const date = useMemo(() => {
    const currentDate = new Date()
    return currentDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }, [])

  const toHumanReadeable = useCallback(() => {
    const dateSplited = date.split('/')
    const day = dateSplited[0]
    const month = dateSplited[1]
    const year = dateSplited[2]

    return `${daysDict[day]}, ${day} de ${monthsDict[month]} del ${year}`
  }, [])
  return { time, date, toHumanReadeable }
}
