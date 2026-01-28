import Part from "./Part/Part";

const Content = (props) => {
  const { parts } = props.course;

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

export default Content;
