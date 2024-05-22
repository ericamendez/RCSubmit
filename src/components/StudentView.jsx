import React, { useRef, useEffect, useState } from 'react'
import '../styles/studentHome.scss'

const StudentView = ({ students }) => {
    const array = [
    {
        name:'Read: https://learn.shayhowe.com (Advanced)',
        isDone: false
    },
    {
        name:'Read: https://learn.shayhowe.com (Advanced)',
        isDone: false
    },
    {
        name:'Read: http://learnlayout.com (Again)',
        isDone: false
    },
    {
        name:'Do: Facebook Newsfeed',
        isDone: false
    },
    {
        name:'Do: https://flexboxfroggy.com/',
        isDone: false
    },
    {
        name:'Do: https://mastery.games/post/flexboxzombies2/',
        isDone: false
    },
    {
        name:'Do: https://cssgridgarden.com/',
        isDone: false
    },
    {
        name:'Watch: https://www.youtube.com/playlist?list=PL7BImOT2srcGCCjBBwNvU5zaB9F30lWye (1,2, & 3)',
        isDone: false
    },
    {
        name:'Watch: https://youtu.be/7Oxz060iedY',
        isDone: false
    },
]
    const pieChartRef = useRef(null);
    const progressFillRef = useRef(null);
    const percentsRef = useRef(null);

    const [hackerNews, setHackerNews] = useState([])
    const [hackerNewsDoneLoading, setHackerNewsDoneLoading] = useState(false)

    useEffect(() => {
        // Example call to progress function after component has mounted
        progress(getNumberOfAssignmentsDone());
    }, []);
    

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
        array.forEach(assignment => {
            if (assignment.isDone) {
                done++;
            }
        })

        const percent = Math.floor(done / array.length * 100)
        
        return percent;
    }

    const handleCheckboxChange = (index) => {
        array[index].isDone = !array[index].isDone;
        progress(getNumberOfAssignmentsDone());
    }

    // MOVE TO BACKEND EVENTUALLY FOR LESS CALLS TO API
    const getHackerNews = async () => {
        const result =  await fetch('https://hacker-news.firebaseio.com/v0/topstories.json') 
        const data = await result.json()
        const top = data.slice(0, 10)

        let full = []
        top.forEach(async (news) => {
            // https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty
            const newsResult =  await fetch(`https://hacker-news.firebaseio.com/v0/item/${news}.json?print=pretty`)
            const individual = await newsResult.json()
            console.log(individual)
            full.push(individual)
        })

        console.log(full);

        await setHackerNews(full)
        await setHackerNewsDoneLoading(true)
    } 

    if(!hackerNewsDoneLoading){getHackerNews()}
    
    return (
        <div className="mainContainer">
            <section className="dueThisWeek">
                <section>
                    <h2>Due This Week (Week2):</h2>
                    <ul>
                        {array.map((assignment, index) => {
                            return (
                            <li key={index}>
                                <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
                                <span key={index}>{assignment.name}</span>
                            </li>
                        )
                        })}
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
                <section></section>
                <section className="hackerContainer">
                        <h3>Hackernews Updates</h3>
                        {hackerNewsDoneLoading ?
                            <ul>
                                {hackerNews.map((news, index) => {
                                    return (
                                        <li key={index}>
                                            <a href={news.url} target="_blank">{news.title}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        : <p>Loading...</p>}
                </section>
            </section>
        </div>
    )
}

export default StudentView