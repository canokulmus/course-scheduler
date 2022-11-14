
import React from 'react'

const AddCourse = ({
    days,
    courseHours,
    hourState,
    dayState,
    courseNameState,
    setCourseNameState,
    addCourse,
    setHourState,
    setDayState,
    handleCloseAddCourseMenu,
}) => {
    return (

        <div className="container my-4">
            <h3 className='text-center py-4'>Add New Course</h3>

            <div className="row d-flex justify-content-center">
                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="hourSelect" className=''>Hour</label>
                        <select id='hourSelect' className="custom-select customInput" value={hourState} onChange={(e) => setHourState(e.target.value)}>
                            {courseHours.map((hour) => {
                                return <option key={hour} value={hour} >{hour}:40</option>
                            }
                            )}
                        </select>
                    </div>
                </div>

                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="daySelect" className=''>Day</label>
                        <select itemType='' id='daySelect' className="custom-select customInput" value={dayState} onChange={(e) => setDayState(e.target.value)}>
                            {days.map((day) => {
                                return <option key={day} value={day} >{day}</option>
                            }
                            )}
                        </select>
                    </div>
                </div>

                <div className="col-3">
                    <div className="form-group">
                        <label htmlFor="courseInput" className=''>Course Name</label>
                        <input type="text" className="form-control customInput text-white" id="courseInput" placeholder="Physics, History etc." value={courseNameState} onChange={(e) => setCourseNameState(e.target.value)} />
                    </div>
                </div>


            </div>

            <div className="row d-flex justify-content-center my-3">
                <div className="col-3">
                    <button type="button" className="btn btn-outline-light btn-lg btn-block" onClick={handleCloseAddCourseMenu}>Cancel</button>
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-success btn-lg btn-block" onClick={addCourse}>Add To Schedule</button>
                </div>
            </div>
        </div>



    )
}


export default AddCourse;