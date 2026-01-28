const Total = (props) => {
  const { parts } = props.course;

  const sum = parts.reduce((acc, current) => acc + current.exercises, 0);

  return (
    <p>
      <b>total of exercises {sum}</b>
    </p>
  );
};

export default Total;
