import { useState } from 'react'
import { useMutation } from "@apollo/client"
import { ADD_COHORT } from '../../queries'

const CohortSettings = () => {
    const [isAddNewCohort, setIsAddNewCohort] = useState(false)
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [addCohort] = useMutation(ADD_COHORT, {
        onCompleted: () => {
          console.log('Assignment added')
        },
        onError: (error) => {
          console.log(error)
        },
    });

    const handleSubmitCohort = async (e) => {
        e.preventDefault()
        await addCohort({ variables: { name, startDate, endDate } })
                
        setIsAddNewCohort(false)
        setName('')
        setStartDate('')
        setEndDate('')
    }

    return (
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
                </section>
                <button onClick={() => setIsAddNewCohort(!isAddNewCohort)}>Add New Cohort</button>
                {isAddNewCohort ? 
                    <form onSubmit={handleSubmitCohort}>
                        <label>Cohort Name: </label>
                        <input type="text" placeholder="Cohort Name" required onChange={({target}) => setName(target.value)} />
                        <label>Start: </label>
                        <input type="date" placeholder="Cohort Start Date" required onChange={({target}) => setStartDate(target.value)} />
                        <label>End:  </label>
                        <input type="date" placeholder="Cohort End Date" required onChange={({target}) => setEndDate(target.value)} />
                        <button>Submit</button>
                    </form>
                    : null
                }
            </section>
        </section>
    )
}

export default CohortSettings