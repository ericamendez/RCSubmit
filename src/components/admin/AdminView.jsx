import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_WEEKS } from "../../queries"
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditDueThisWeek from "./EditDueThisWeek";
import '../../styles/admin.css'
import CohortSettings from "./CohortSettings";

const AdminView = () => {
    const [currentWeek, setCurrentWeek] = useState(1)
    
    const resultWeeks = useQuery(ALL_WEEKS, {
        onError: (error) => {
          console.log(error)
        },
      })

    const getWeek = async (num) => {
        setCurrentWeek(Number(num));
        // const newWeek = await getWeeksAssignmentsData

        console.log();
        // setCurrentWeekAssignments(getWeeksAssignmentsData.getWeeksAssignments);
    }

    //when i click on edit, trash, or checkbox i can refer to the current week and the assignment id to make changes
    return (
        <div className="mainContainer">
            <section className="adminTop">
                <EditDueThisWeek currentWeek={currentWeek} />
                <section className="weeks">
                    <h3>Weeks</h3>
                    <ul>
                        { resultWeeks.data ?  
                            resultWeeks.data.getAllWeeks.map((week) => (
                                <li key={week.week}>
                                    <a href="#" onClick={()=> getWeek(week.week)}>Week {week.week}</a>
                                </li>
                            )) : null
                        }
                    </ul>
                </section>
            </section>
            <CohortSettings />
            <section>
                <section >
                    <p>Select Current Cohort dropdown/Create New Cohort</p>
                    <p>(current cohort will just have the group of students as an array.)</p>
                    <p>(each student will be associated to work the submit each week.)</p>
                    <p>(every week we move forward to will open a new group of possible submissions)</p>

                    <p>when students submit, show green if assigment submitted on time, yellow if submitted past due date</p>
                    <p>View Previous Cohort</p>
                </section>
            </section>
        </div>
    )
}

export default AdminView