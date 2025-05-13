/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"; 

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    return (
        <div>
            <h2>give feedback</h2>
            <Button 
              onGood={() => setGood (good + 1)}
              onNeutral={() => setNeutral(neutral + 1)}
              onBad={() => setBad (bad + 1)}
            />
            <h2>statistics</h2>
            <Statistics 
              good={good}
              neutral={neutral}
              bad={bad}
            />
        </div>
    );
}

const Button = ({onGood, onNeutral, onBad}) => {
    return (
        <div>
            <button onClick={onGood} >good</button>
            <button onClick={onNeutral} >neutral</button>
            <button onClick= {onBad} >bad</button>
        </div>
    ); 
}

const Statistics = ({good, neutral, bad}) => {

    const total = good + neutral + bad;
    const average = (good - bad) / total;
    const positive = (good * 100) / total;

    if (total === 0) {
        return <p>No feedback given</p>
    }
    return (
        <div>
            <table>
                <tbody>
                    <StatisticsLine text="good" value={good}/>
                    <StatisticsLine text="neutral" value={neutral}/>
                    <StatisticsLine text="bad" value={bad}/>
                    <StatisticsLine text="all" value={total}/>
                    <StatisticsLine text="average" value={average}/>
                    <StatisticsLine text="positive" value={positive}/>
                </tbody>
            </table>   
        </div>          
    );
}

const StatisticsLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
}
export default App