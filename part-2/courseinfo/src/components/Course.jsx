import React from "react";

// header component
const Header = ({ name }) => <h2>{name}</h2>

// content component
const Content = ({ parts }) => (
    <div>
      {parts.map(part => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  )
  

// total component

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>Total of {total} exercises</strong></p>
}

// course component

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course