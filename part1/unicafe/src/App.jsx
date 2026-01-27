import { useState } from "react";

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value} {text === "positive" && "%"}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = total === 0 ? 0 : (good / total) * 100;

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>

      <Button onClick={() => setGood((prev) => prev + 1)} text="good" />
      <Button onClick={() => setNeutral((prev) => prev + 1)} text="neutral" />
      <Button onClick={() => setBad((prev) => prev + 1)} text="bad" />

      <h2>statistics</h2>

      {!good && !neutral && !bad ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  );
}

export default App;
