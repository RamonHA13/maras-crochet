import { useCallback, useEffect, useMemo, useState } from 'react'

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
  '0': 'Domingo',
  '1': 'Lunes',
  '2': 'Martes',
  '3': 'Miércoles',
  '4': 'Jueves',
  '5': 'Viernes',
  '6': 'Sábado'
}

const getCurrentTime = () => {
  const date = new Date()
  const hour = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hour}:${minutes}:${seconds}`
}

export default function useDate() {
  const [time, setTime] = useState<string>(getCurrentTime())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime())
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

  const dayOfWeek = useMemo(() => new Date().getDay(), [])

  const toHumanReadeable = useCallback(() => {
    const dateSplited = date.split('/')
    const day = dateSplited[0]
    const month = dateSplited[1]
    const year = dateSplited[2]

    return `${daysDict[dayOfWeek]}, ${day} de ${monthsDict[month]} del ${year}`
  }, [])

  return { time, date, toHumanReadeable }
}
