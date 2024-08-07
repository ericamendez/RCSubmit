import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_WEEKS, ALL_COHORTS } from "../../queries";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditDueThisWeek from "./EditDueThisWeek";
import "../../styles/admin.css";
import CohortSettings from "./CohortSettings";

const AdminView = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentCohort, setCurrentCohort] = useState(null);
  const [cohorts, setCohorts] = useState(null);

  useQuery(ALL_COHORTS, {
    onCompleted: async (data) => {
      await setCohorts(data.getAllCohorts);
      let resultCohort = await data.getAllCohorts.find(
        (cohort) => cohort.isCurrentCohort === true,
      );
      setCurrentCohort(await resultCohort);
      setCurrentWeek(resultCohort.currentWeek);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const resultWeeks = useQuery(ALL_WEEKS, {
    onError: (error) => {
      console.log(error);
    },
  });

  const getWeek = async (num) => {
    setCurrentWeek(Number(num));
    // const newWeek = await getWeeksAssignmentsData

    console.log();
    // setCurrentWeekAssignments(getWeeksAssignmentsData.getWeeksAssignments);
  };

  //when i click on edit, trash, or checkbox i can refer to the current week and the assignment id to make changes
  return (
    <div className="mainContainer">
      <section className="adminTop">
        <EditDueThisWeek currentWeek={currentWeek} />
        <section className="weeks">
          <h3>Weeks</h3>
          <ul>
            {resultWeeks.data
              ? resultWeeks.data.getAllWeeks.map((week) => (
                  <li key={week.week}>
                    <a href="#" onClick={() => getWeek(week.week)}>
                      Week {week.week}
                    </a>
                    {currentCohort &&
                    currentCohort.currentWeek &&
                    currentCohort.currentWeek == week.week ? (
                      <span>(current week)</span>
                    ) : null}
                  </li>
                ))
              : null}
          </ul>
        </section>
      </section>
      <CohortSettings currentCohort={currentCohort} />
    </div>
  );
};

export default AdminView;
