import { useState } from "react"

const weeksCollection = [
    {
        name: 'Week 1', 
        id: 1,
        asisgnments: [
            'RC Community Guidelines: https://docs.google.com/document/d/10gB6COIkXvJRIeocW8yrict7-4oLA2MM99EsoLu6zbE/edit?usp=sharing',
            'Honor Code: https://docs.google.com/document/d/1J8UjYGLLETPdRS6WA2RkQu6weJrPGUr0GdBdO1X7Ens/edit?usp=sharing',
            'Attendance: https://www.notion.so/resilientcoders/Attendance-2023B-86a9e6f2bcfe41baa0a922a686b065a9',
            'Weekly rotations: https://www.notion.so/resilientcoders/Weekly-Rotations-2023B-4de083323382410d81dda249848a522a',
            '2023a classroom: https://live.remo.co/e/2023b-classroom',
            'Schoology: Create a STUDENT account and use this course code: FNDP-XGJP-MSRCP',
            'Emergency Contact: Please fill out this form https://forms.gle/HKxLaK3iRmKKd3T86',
        ]
    },
    {
        name: 'Week 2', 
        id: 2,
        asisgnments: [
            'Read: https://learn.shayhowe.com (Advanced)',
            'Read: http://learnlayout.com (Again)',
            'Do: Facebook Newsfeed',
            'Do: https://flexboxfroggy.com/',
            'Do: https://mastery.games/post/flexboxzombies2/',
            'Do: https://cssgridgarden.com/',
            'Watch: https://www.youtube.com/playlist?list=PL7BImOT2srcGCCjBBwNvU5zaB9F30lWye (1,2, & 3)',
            'Watch: https://youtu.be/7Oxz060iedY',
        ]
    },
    {
        name: 'Week 3', 
        id: 3,
        asisgnments: [
            'demo'
        ]
    },
    {
        name: 'Week 4', 
        id: 4,
        asisgnments: [
            'demo'
        ]
    },
    {
        name: 'Week 5', 
        id: 5,
        asisgnments: [
            'demo'
        ]
    },
    {
        name: 'Week 6', 
        id: 6,
        asisgnments: [
            'demo'
        ]
    },
    {
        name: 'Week 7', 
        id: 7,
        asisgnments: [
            'demo'
        ]
    },
    {
        name: 'Week 8', 
        id: 8,
        asisgnments: [
            'demo'
        ]
    },{
        name: 'Week 9', 
        id: 9,
        asisgnments: [
            'demo'
        ]
    },{
        name: 'Week 10', 
        id: 10,
        asisgnments: [
            'demo'
        ]
    },{
        name: 'Week 11', 
        id: 11,
        asisgnments: [
            'demo'
        ]
    },
    {
        name: 'Week 12', 
        id: 12,
        asisgnments: [
            'demo'
        ]
    },{
        name: 'Week 13', 
        id: 13,
        asisgnments: [
            'demo'
        ]
    },{
        name: 'Week 14', 
        id: 14,
        asisgnments: [
            'demo'
        ]
    },{
        name: 'Week 15', 
        id: 15,
        asisgnments: [
            'demo'
        ]
    },{
        name: 'Week 16', 
        id: 16,
        asisgnments: [
            'demo'
        ]
    },{
        name: 'Week 17', 
        id: 17,
        asisgnments: [
            'demo'
        ]
    },{
        name: 'Week 18', 
        id: 18,
        asisgnments: [
            'demo'
        ]
    },
]

const AdminView = () => {
    const [currentWeek, setCurrentWeek] = useState(1)
    const [currentWeekAssignments, setCurrentWeekAssignments] = useState(weeksCollection[currentWeek - 1].asisgnments)

    const getWeek = (num) => {
        setCurrentWeek(num);
        setCurrentWeekAssignments(weeksCollection[num - 1].asisgnments);
    }

    return (
        <div className="mainContainer">
            <section className="adminTop">
                <section className="editDueThisWeek">
                    <h2>Due This Week (Week {currentWeek}):</h2>
                    <ul>
                        {currentWeekAssignments.map((assignment) => (
                            <li key={assignment.id}>
                                <input type="checkbox"/>
                                <p>{assignment}</p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="weeks">
                    <ul>
                        {
                            weeksCollection.map((week) => (
                                <li key={week.id}>
                                    <a href="#" onClick={()=> getWeek(week.id)}>{week.name}</a>
                                </li>
                            ))
                        }
                    </ul>
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