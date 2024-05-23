import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_WEEKS, ADD_ASSIGNMENT, GET_WEEKS_ASSIGNMENTS, DELETE_ASSIGNMENT } from "../../queries"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const DueThisWeek = ({currentWeek}) => {
    const [currentWeekAssignments, setCurrentWeekAssignments] = useState(null)
    const [isAdd, setIsAdd] = useState(false)
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [assignmentType, setAssignmentType] = useState('read')
    const [isEdit, setIsEdit] = useState('')

    const assignmentTypes = ['read', 'fill out', 'watch', 'submitLink', 'submitZip', 'submitScreenshot']
    
    useQuery(GET_WEEKS_ASSIGNMENTS, {
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

    const handleSubmitAssignment = async (e) => {
        e.preventDefault()
        await addAssignment({ variables: { description, link, week: currentWeek, show: false, assignmentType } })
                
        setIsAdd(false)
        setDescription('')
        setLink('')
    }

    const [deleteAssignment] = useMutation(DELETE_ASSIGNMENT);

    return (
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
    )
}

export default DueThisWeek;