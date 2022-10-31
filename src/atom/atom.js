
import { atomWithStorage } from 'jotai/utils'

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
export const courseHours = [8, 9, 10, 11, 12, 13, 14, 15, 16]
const emptySchedule = () => {
    let schedule = []
    days.forEach(day => {
        courseHours.forEach(hour => {
            schedule.push({ day: day, hour: hour, courseName: "" })
        })
    })
    return schedule;
}

export const scheduleAtom = atomWithStorage("schedule", emptySchedule())

