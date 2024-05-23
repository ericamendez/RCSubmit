import React, { useRef, useEffect, useState } from 'react'

const HackerNews = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getdata()
    }, []);

    // MOVE TO BACKEND EVENTUALLY FOR LESS CALLS TO API
    const getdata = async () => {
        try {
            const result =  await fetch('https://hacker-news.firebaseio.com/v0/topstories.json') 
            const data = await result.json()
            const top = data.slice(0, 10)
    
            const full = await Promise.all(top.map(async (news) => {
                const newsResult =  await fetch(`https://hacker-news.firebaseio.com/v0/item/${news}.json?print=pretty`)
                const individual = await newsResult.json()
                return individual
            }))
    
            console.log(full);
    
            setData(full)
        }catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    } 

    if (loading) {
        return (
            <section className="hackerContainer">
                <h3>HackerNews Updates</h3>
                <div>Loading...</div>
            </section>
        )
    }
    
    return (                
        <section className="hackerContainer">
            <h3>HackerNews Updates</h3>
            <ul>
                {data.map((news, index) => {
                    return (
                        <li key={index}>
                                    <a href={news.url} target="_blank">{news.title}</a>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default HackerNews