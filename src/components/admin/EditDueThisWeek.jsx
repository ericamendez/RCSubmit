import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_WEEKS, ADD_ASSIGNMENT, GET_WEEKS_ASSIGNMENTS, DELETE_ASSIGNMENT, EDIT_ASSIGNMENT } from "../../queries"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const DueThisWeek = ({currentWeek}) => {
    const [currentWeekAssignments, setCurrentWeekAssignments] = useState(null)
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [assignmentType, setAssignmentType] = useState('read')

    const assignmentTypes = ['read', 'fill out', 'watch', 'submitLink', 'submitZip', 'submitScreenshot']
    
    useQuery(GET_WEEKS_ASSIGNMENTS, {
        variables: { week: currentWeek },
        onCompleted: (data) => {
            setCurrentWeekAssignments(data.getWeeksAssignments)
        },
    });

    const [addAssignment] = useMutation(ADD_ASSIGNMENT, {
        onCompleted: (response) => {
          console.log('Assignment added')
          let newAssignment = {
            id: response.addAssignment.id,
            description: response.addAssignment.description,
            week: response.addAssignment.week,
            link: response.addAssignment.link,
            show: response.addAssignment.show,
            assignmentType: response.addAssignment.assignmentType
          }
          setCurrentWeekAssignments([...currentWeekAssignments, newAssignment])
        },
        refetchQueries: [{ query: ALL_WEEKS }],
        onError: (error) => {
          console.log(error)
        },
    });
    const [editAssignment] = useMutation(EDIT_ASSIGNMENT, {
        onCompleted: (response) => {
            console.log('Assignment edited')
            console.log('this is the response',response.editAssignment.id);
            let editedObj = currentWeekAssignments.map( assignment => {
                if(assignment.id === response.editAssignment.id) {
                    return {
                        id: response.editAssignment.id,
                        description: response.editAssignment.description,
                        week: response.editAssignment.week,
                        link: response.editAssignment.link,
                        show: response.editAssignment.show,
                        assignmentType: response.editAssignment.assignmentType
                    }
                }
                return assignment
            })

            console.log(editedObj);
            setCurrentWeekAssignments(editedObj)
        },
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

    const handleShowAssignment = async (e, id, currentShow) => {
        e.preventDefault()
        console.log('**************',currentShow)
        await editAssignment({ variables: { id, show: !currentShow, link: null, week: null, description: null, assignmentType:null } })
    }

    const [deleteAssignment] = useMutation(DELETE_ASSIGNMENT, {
        onCompleted: (response) => {
            const deletedAssignmentId = response.deleteAssignment;
            console.log(response);
            console.log("Deleted assignment with id:", deletedAssignmentId);
            setCurrentWeekAssignments(currentWeekAssignments.filter((a) => a.id !== deletedAssignmentId));
        },
        onError: (error) => {
          console.error("Error deleting assignment:", error);
        },
      });

    return (
        <section className="editDueThisWeek">
                    <h2>Due This Week (Week {currentWeek}):</h2>
                    <ul className="assignmentContainer">
                        { currentWeekAssignments ? currentWeekAssignments.map((assignment) => (
                            <li key={assignment.id}>
                                <div>
                                    <FontAwesomeIcon icon={faCircleCheck} className={assignment && assignment.show ? 'chaeck green' : 'check'} onClick={(e) => handleShowAssignment(e, assignment.id, assignment.show) } />
                                    <p>{assignment.description} 
                                        {assignment.link ? <a href={assignment.link}>Link</a> : ''}
                                    </p>
                                </div>
                                <div className="editAssignmentIcons">
                                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => setIsEdit(!isEdit) } />
                                    <FontAwesomeIcon icon={faTrash} className="trash" onClick={ () => {deleteAssignment({ variables: { id: assignment.id } })} } />
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