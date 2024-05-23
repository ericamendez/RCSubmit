import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_WEEKS, ADD_ASSIGNMENT, GET_WEEKS_ASSIGNMENTS, DELETE_ASSIGNMENT } from "../queries"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import '../styles/admin.css'

const weeksCollection = [
    {
        name: 'Week 1', 
        id: 1,
        asisgnments: [
            {
                id: 12,
                description: 'RC Community Guidelines:',
                link: 'https://docs.google.com/document/d/10gB6COIkXvJRIeocW8yrict7-4oLA2MM99EsoLu6zbE/edit?usp=sharing',
                week: 1,
                show: false,
            },
            {
                id: 22,
                description: 'Honor Code: ',
                link: 'https://docs.google.com/document/d/1J8UjYGLLETPdRS6WA2RkQu6weJrPGUr0GdBdO1X7Ens/edit?usp=sharing',
                week: 2,
                show: false,
            },
            // 'Honor Code: https://docs.google.com/document/d/1J8UjYGLLETPdRS6WA2RkQu6weJrPGUr0GdBdO1X7Ens/edit?usp=sharing',
            // 'Attendance: https://www.notion.so/resilientcoders/Attendance-2023B-86a9e6f2bcfe41baa0a922a686b065a9',
            // 'Weekly rotations: https://www.notion.so/resilientcoders/Weekly-Rotations-2023B-4de083323382410d81dda249848a522a',
            // '2023a classroom: https://live.remo.co/e/2023b-classroom',
            // 'Schoology: Create a STUDENT account and use this course code: FNDP-XGJP-MSRCP',
            // 'Emergency Contact: Please fill out this form https://forms.gle/HKxLaK3iRmKKd3T86',
        ]
    },
    {
        name: 'Week 2', 
        id: 2,
        asisgnments: [
            // 'Read: https://learn.shayhowe.com (Advanced)',
            // 'Read: http://learnlayout.com (Again)',
            // 'Do: Facebook Newsfeed',
            // 'Do: https://flexboxfroggy.com/',
            // 'Do: https://mastery.games/post/flexboxzombies2/',
            // 'Do: https://cssgridgarden.com/',
            // 'Watch: https://www.youtube.com/playlist?list=PL7BImOT2srcGCCjBBwNvU5zaB9F30lWye (1,2, & 3)',
            // 'Watch: https://youtu.be/7Oxz060iedY',
        ]
    }
]

const AdminView = () => {
    const [currentWeek, setCurrentWeek] = useState(1)
    const [currentWeekAssignments, setCurrentWeekAssignments] = useState(null)
    const [isAdd, setIsAdd] = useState(false)
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [assignmentType, setAssignmentType] = useState('read')
    const [isEdit, setIsEdit] = useState('')

    const assignmentTypes = ['read', 'fill out', 'watch', 'submitLink', 'submitZip', 'submitScreenshot']

    const resultWeeks = useQuery(ALL_WEEKS, {
        onCompleted: (data) => {
            // assignmnetIDArray = data.getAllWeeks[currentWeek - 1].assignments
            // setCurrentWeekAssignments()
        },
        onError: (error) => {
          console.log(error)
        },
      })

    const { loading, error, getWeeksAssignmentsData } = useQuery(GET_WEEKS_ASSIGNMENTS, {
        variables: { week: currentWeek },
        onCompleted: (data) => {
            setCurrentWeekAssignments(data.getWeeksAssignments)
        },
    });

    const [addAssignment] = useMutation(ADD_ASSIGNMENT, {
        onCompleted: () => {
          console.log('Assignment added')
        },
        refetchQueries: [{ query: ALL_WEEKS }],
        onError: (error) => {
          console.log(error)
        },
      });

    const [deleteAssignment] = useMutation(DELETE_ASSIGNMENT);


    const getWeek = async (num) => {
        setCurrentWeek(Number(num));
        // const newWeek = await getWeeksAssignmentsData

        console.log();
        // setCurrentWeekAssignments(getWeeksAssignmentsData.getWeeksAssignments);
    }

    const handleSubmitAssignment = async (e) => {
        e.preventDefault()
        await addAssignment({ variables: { description, link, week: currentWeek, show: false, assignmentType } })
                
        setIsAdd(false)
        setDescription('')
        setLink('')
    }

    //when i click on edit, trash, or checkbox i can refer to the current week and the assignment id to make changes
    return (
        <div className="mainContainer">
            <section className="adminTop">
                <section className="editDueThisWeek">
                    <h2>Due This Week (Week {currentWeek}):</h2>
                    <ul className="assignmentContainer">
                        { currentWeekAssignments ? currentWeekAssignments.map((assignment) => (
                            <li key={assignment.id}>
                                <div>
                                    <input type="checkbox"/>
                                    <p>{assignment.description} 
                                        {assignment.link ? <a href={assignment.link}>Link</a> : ''}
                                    </p>
                                </div>
                                <div className="editAssignmentIcons">
                                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => setIsEdit(!isEdit) } />
                                    <FontAwesomeIcon icon={faTrash} onClick={ () => {deleteAssignment({ variables: { id: assignment.id } })} } />
                                </div>
                            </li>
                        )): null }
                    </ul>
                    <button onClick={() => setIsAdd(!isAdd)}>Add Assignment</button>
                    {
                        isAdd ? 
                        <form onSubmit={handleSubmitAssignment}>
                            <ul>
                                <li>
                                    Description: 
                                    <input type="text" onChange={({ target }) => setDescription(target.value)} />
                                </li>
                                <li>
                                    Link: 
                                    <input type="text" onChange={({ target }) => setLink(target.value)}  />
                                </li>
                                <li>
                                    Assignment Type:
                                    <select onChange={({ target }) => setAssignmentType(target.value)}>
                                        { assignmentTypes.map((type, i) => <option key={i} value={type} >{type}</option>)}
                                    </select>
                                </li>
                                <li>
                                    <button>Submit</button>
                                </li>
                            </ul>
                        </form>
                        : null
                    }
                </section>
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
            <section className="cohort">
                <section>
                    <h3>Cohort Settings</h3>
                    <section className="cohortDivide">
                        <section>
                            <h5>Current Cohort</h5>
                        </section>
                        <section>
                            <h5>Previous Cohorts</h5>

                        </section>
                        <section>
                            add
                        </section>
                    </section>
                </section>
            </section>
            <section>
                <section >
                    <p>Have a edit due date</p>
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