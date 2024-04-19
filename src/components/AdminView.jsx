import { useState } from "react"

const AdminView = () => {
    const [currentWeek, setCurrentWeek] = useState(2)
    const [thisWeek, setThisWeek] = useState(2)

    return (
        <div className="mainContainer">
            <section className="adminTop">
                <section className="editDueThisWeek">
                    <h2>Due This Week (Week {currentWeek}):</h2>
                    <ul>
                        <li>
                            <input type="checkbox"/>
                            <p>Read: https://learn.shayhowe.com (Advanced)</p>
                        </li>
                        <li>
                            <input type="checkbox"/>
                            <p>Read: http://learnlayout.com (Again)</p>
                        </li>
                        <li>
                            <input type="checkbox"/>
                            <p>Do: Facebook Newsfeed</p>
                        </li>
                        <li>
                            <input type="checkbox"/>
                            <p>Do: https://flexboxfroggy.com/</p>
                        </li>
                        <li>
                            <input type="checkbox"/>
                            <p>Do: https://mastery.games/post/flexboxzombies2/</p>
                        </li>
                        <li>
                            <input type="checkbox"/>
                            <p>Do: https://cssgridgarden.com/</p>
                        </li>
                        <li>
                            <input type="checkbox"/>
                            <p>Watch: https://www.youtube.com/playlist?list=PL7BImOT2srcGCCjBBwNvU5zaB9F30lWye (1,2, & 3)</p>
                        </li>
                        <li>
                            <input type="checkbox"/>
                            <p>Watch: https://youtu.be/7Oxz060iedY</p>
                        </li>
                    </ul>
                </section>
                <section className="weeks">
                    <ul>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(1)}>Week 1</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(2)}>Week 2</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(3)}>Week 3</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(4)}>Week 4</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(5)}>Week 5</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(6)}>Week 6</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(7)}>Week 7</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(8)}>Week 8</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(9)}>Week 9</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(10)}>Week 10</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(11)}>Week 11</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(12)}>Week 12</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(13)}>Week 13</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(14)}>Week 14</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(15)}>Week 15</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(16)}>Week 16</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(17)}>Week 17</a>
                        </li>
                        <li>
                            <a href="#" onClick={()=> setCurrentWeek(18)}>Week 18</a>
                        </li>
                    </ul>
                </section>
            </section>
        </div>
    )
}

export default AdminView