import React, { useRef, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import HackerNews from "./HackerNews";
import DailyChallenge from "./DailyChallenge";
import {
  GET_STUDENT_SHOWN_ASSIGNMENTS,
  UPDATE_SUBMISSIONS,
} from "../../queries";
import "../../styles/studentHome.scss";

const StudentView = ({ user }) => {
  const pieChartRef = useRef(null);
  const progressFillRef = useRef(null);
  const percentsRef = useRef(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentWeekAssignments, setCurrentWeekAssignments] = useState(null);
  const [studentsSubmissionsCurrentWeek, setStudentsSubmissionsCurrentWeek] =
    useState(null);
  // const [percentDone, setPercentDone] = useState(0);
  const cohortName = user.cohort;

  //Get student current week shown work
  useQuery(GET_STUDENT_SHOWN_ASSIGNMENTS, {
    variables: { cohort: cohortName },
    onCompleted: async (data) => {
      setCurrentWeekAssignments(data.getStudentShownAssignments);
      setCurrentWeek(data.getStudentShownAssignments[0].week);
      const doneList = await user.submissions.find(
        (week) => week.week === data.getStudentShownAssignments[0].week,
      );
      setStudentsSubmissionsCurrentWeek(doneList);
      getNumberOfAssignmentsDone(
        doneList.assignments,
        data.getStudentShownAssignments,
      );
    },
  });

  const [updateSubmissions] = useMutation(UPDATE_SUBMISSIONS, {
    onCompleted: (response) => {
      console.log("Submission updated");
      setStudentsSubmissionsCurrentWeek(response.updateSubmissions);
      console.log(currentWeekAssignments);
      getNumberOfAssignmentsDone(
        response.updateSubmissions.assignments,
        currentWeekAssignments,
      );
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const progress = (percentDone) => {
    const ppc = pieChartRef.current;
    const progressFill = progressFillRef.current;
    const percentsSpan = percentsRef.current;
    let deg = (360 * percentDone) / 100;

    if (percentDone > 50) {
      ppc.classList.add("gt-50");
    }
    progressFill.style.transform = `rotate(${deg}deg)`;
    percentsSpan.textContent = `${percentDone}%`;
  };

  const getNumberOfAssignmentsDone = (doneList, allList) => {
    let done = doneList.length;

    const percent = Math.floor((done / allList.length) * 100);
    progress(percent);
  };

  const handleCheckboxChange = async (id) => {
    await updateSubmissions({
      variables: {
        userID: user.id,
        week: currentWeek,
        assignmentID: id,
        isDone:
          studentsSubmissionsCurrentWeek &&
          studentsSubmissionsCurrentWeek.assignments.includes(id)
            ? false
            : true,
      },
    });
  };

  return (
    <div className="mainContainer">
      <section className="dueThisWeek">
        <section>
          <h2>Due This Week (Week {currentWeek}):</h2>
          <ul>
            {currentWeekAssignments ? (
              currentWeekAssignments.map((assignment, index) => {
                return (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={
                        studentsSubmissionsCurrentWeek &&
                        studentsSubmissionsCurrentWeek.assignments.includes(
                          assignment.id,
                        )
                      }
                      onChange={() => handleCheckboxChange(assignment.id)}
                    />
                    <span key={index}>{assignment.description}</span>
                  </li>
                );
              })
            ) : (
              <p>Loading ...</p>
            )}
          </ul>
          <h2>Announcements:</h2>
        </section>
        <section>
          <h3>Weekly Progress</h3>
          <div
            ref={pieChartRef}
            className="progress-pie-chart"
            data-percent="63"
          >
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
  );
};

export default StudentView;
