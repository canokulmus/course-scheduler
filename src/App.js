
import React, { useState } from 'react'
import AddCourse from './Components/AddCourse'
import { useAtom } from 'jotai'
import { scheduleAtom, days, courseHours } from './atom/atom'

import html2canvas from 'html2canvas'


const App = () => {

    const [dayState, setDayState] = useState("Monday")
    const [hourState, setHourState] = useState(8)
    const [courseNameState, setCourseNameState] = useState("")
    const [addCourseMenu, setAddCourseMenu] = useState(false)
    const [schedule, setSchedule] = useAtom(scheduleAtom)

    // useEffect(() => {
    //     const schedule = localStorage.getItem('schedule')
    //     if (schedule) {
    //         setSchedule(JSON.parse(schedule))
    //     }
    // }, [])

    // useEffect(() => {

    //     if (addCourseMenu) {
    //         document.getElementById(`${dayState}-${hourState}`).classList.add("course-block-selected")
    //         document.getElementById(`${dayState}-${hourState}`).innerHTML = courseNameState
    //     }
    //     else {
    //         document.getElementById(`${dayState}-${hourState}`).classList.remove("course-block-selected")
    //     }

    // }, [dayState, hourState, addCourseMenu, courseNameState])

    const CaptureImage = () => {

        const a = document.createElement('a')
        html2canvas(document.querySelector("#schedule")).then(canvas => {
            a.href = canvas.toDataURL("image/png")
            a.download = "schedule.png"
            a.click()
        });
    };

    const renderDaysRow = () => {
        return days.map((day, index) => {
            return <div key={index} className="block col-2">{day}</div>
        }
        )
    }

    const renderCourseRows = () => {
        return courseHours.map((hour) => {
            return (
                <div className='row w-100' key={hour}>
                    <div className='block col-1 hour'>{hour}:40</div>
                    {renderCourseBlocks(hour)}
                </div>
            );
        })
    }

    const removeCourse = (day, hour) => {
        const newSchedule = schedule.map((course) => {
            if (course.day === day && course.hour === hour) {
                course.courseName = ""
            }
            return course
        })
        setSchedule(newSchedule)
        setCourseNameState("")
    }

    const removeAllCourses = () => {
        const newSchedule = schedule.map((course) => {
            course.courseName = ""
            return course
        })
        setSchedule(newSchedule)
    }


    const handleCourseClick = (day, hour) => {
        setDayState(day)
        setHourState(hour)

        const course = schedule.find((course) => {
            return course.day === day && course.hour === hour
        })
        if (course.courseName !== "") {
            setCourseNameState(course.courseName)
        }

        setAddCourseMenu(true)
    }

    const handleCloseAddCourseMenu = () => {
        setAddCourseMenu(false)
    }

    const handleOpenAddCourseMenu = () => {
        setAddCourseMenu(true)
    }


    const renderCourseBlocks = (hour) => {
        return days.map((day) => {
            return (
                <div
                    key={Math.random() * 10000}
                    id={`${day}-${hour}`}
                    className={`block course-block col-2 ${(day == dayState && hour == hourState && addCourseMenu) ? "course-block-selected" : ""} `}
                    onClick={() => {
                        handleCourseClick(day, hour);
                    }}
                >
                    {
                        schedule.map((course) => {
                            if (course.day === day && course.hour === hour) {
                                return course.courseName
                            }
                        })
                    }
                    {
                        schedule.map((course) => {
                            if (course.day === day && course.hour === hour && course.courseName !== "") {
                                return (
                                    //remove course button
                                    <button
                                        key={day + hour}
                                        type="button"
                                        className="btn btn-sm remove-course-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeCourse(course.day, course.hour);
                                        }}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )
                            }
                        })
                    }
                </div>
            );
        })
    }


    const addCourse = () => {
        //find the course in schedule and change its name
        let newSchedule = schedule.map((course) => {
            if (course.day === dayState && course.hour === hourState) {
                course.courseName = courseNameState
            }
            return course;
        })
        setSchedule(newSchedule)
        setCourseNameState("")
        handleCloseAddCourseMenu()
    }

    return (
        <div>
            <div id='schedule' className="container my-4 d-flex flex-column justify-content-center align-items-center">
                {/* <h1>Course Scheduler</h1> */}

                <div className="row w-100">
                    <div className="col-1"></div>
                    {renderDaysRow()}
                </div>
                {renderCourseRows()}
            </div>

            {addCourseMenu ?
                <AddCourse
                    days={days}
                    courseHours={courseHours}
                    hourState={hourState}
                    dayState={dayState}
                    addCourseMenu={addCourseMenu}
                    courseNameState={courseNameState}
                    setCourseNameState={setCourseNameState}
                    addCourse={addCourse}
                    setHourState={setHourState}
                    setDayState={setDayState}
                    handleCloseAddCourseMenu={handleCloseAddCourseMenu}
                    removeAllCourses={removeAllCourses}
                />
                :
                <div className="container bg-transparent">
                    <div className="row d-flex justify-content-center my-3">
                        <button type="button" className="btn btn-reset btn-lg mr-4" onClick={removeAllCourses}>
                            <i className="fa-solid fa-trash mr-2"></i>
                            Reset Schedule
                        </button>

                        <button type="button" className="btn btn-image btn-lg mr-4" onClick={CaptureImage}>
                            <i className="fa-solid fa-image mr-2"></i>
                            Save as Image
                        </button>

                        <button type="button" className="btn btn-main btn-lg" onClick={() => setAddCourseMenu(!addCourseMenu)}>
                            <i className="fa-regular fa-calendar-plus mr-2"></i>
                            Add New Course
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default App;


