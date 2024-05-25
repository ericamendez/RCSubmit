import React, { useRef, useEffect, useState } from 'react'
import { useQuery, useMutation } from "@apollo/client"
import HackerNews from './HackerNews'
import DailyChallenge from './DailyChallenge'
import {GET_STUDENT_SHOWN_ASSIGNMENTS} from '../../queries'
import '../../styles/studentHome.scss'

const StudentView = ({ user }) => {
    
    const pieChartRef = useRef(null);
    const progressFillRef = useRef(null);
    const percentsRef = useRef(null);
    const [currentWeek, setCurrentWeek] = useState(0);
    const [currentWeekAssignments, setCurrentWeekAssignments] = useState(null);
    const [studentsAssignments, setStudentsAssignments] = useState(null);
    const cohortName = user.cohort;

    //Get student current week shown work
    useQuery(GET_STUDENT_SHOWN_ASSIGNMENTS, {
        variables: { cohort: cohortName },
        onCompleted: (data) => {
            setCurrentWeekAssignments(data.getStudentShownAssignments)
            setCurrentWeek(data.getStudentShownAssignments[0].week)
        },
    });

    const progress = (percent) => {
        const ppc = pieChartRef.current;
        const progressFill = progressFillRef.current;
        const percentsSpan = percentsRef.current;
        let deg = 360*percent/100;
    
        if (percent > 50) {
          ppc.classList.add('gt-50');
        }
        progressFill.style.transform = `rotate(${deg}deg)`
        percentsSpan.textContent = `${percent}%`;
      }
    const getNumberOfAssignmentsDone = () => {
        let done = 0;
        currentWeekAssignments.forEach(assignment => {
            if (assignment.isDone) {
                done++;
            }
        })

        const percent = Math.floor(done / currentWeekAssignments.length * 100)
        
        return percent;
    }

    // do this to studnets assignments, sepearte from global
    const handleCheckboxChange = (id) => {

        

        // currentWeekAssignments[index].isDone = !currentWeekAssignments[index].isDone;
        // progress(getNumberOfAssignmentsDone());
    }

    
    return (
        <div className="mainContainer">
            <section className="dueThisWeek">
                <section>
                    <h2>Due This Week (Week {currentWeek}):</h2>
                    <ul>
                        { currentWeekAssignments ? 
                            currentWeekAssignments.map((assignment, index) => {
                                return (
                                <li key={index}>
                                    <input type="checkbox" onChange={() => handleCheckboxChange(assignment.id)} />
                                    <span key={index}>{assignment.description}</span>
                                </li>
                                )
                            }) : <p>Loading ...</p>
                        }
                    </ul>
                </section>
                <section>
                    <h3>Weekly Progress</h3>
                    <div ref={pieChartRef} className="progress-pie-chart" data-percent="63">
                    <div className="ppc-progress">
                        <div ref={progressFillRef} className="ppc-progress-fill"></div>
                    </div>
                    <div className="ppc-percents">
                        <div className="pcc-percents-wrapper">
                        <span ref={percentsRef}>%</span>
                        </div>
                    </div>
                    </div>
                </section>
            </section>
            <section className="extra">
                <DailyChallenge />
                <HackerNews />
            </section>
        </div>
    )
}

export default StudentView