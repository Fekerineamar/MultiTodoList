import Todo from "./Todo";

const App = () => {
  const state = {
    todo: [
      { id: 1, content: "Web Developers" },
      { id: 2, content: "Web Designers" },
      { id: 3, content: "Engineers" },
    ],
  };
  return (
    <div className="todo-app container">
      <Todo todo={state.todo} />
      <footer style={{ position: "fixed", bottom: "20px", left: "20px" }}>
        <a
          href="https://github.com/fekerineamar"
          target={"_blank"}
          rel="noreferrer"
        >
          <i className="material-icons gray-text">stars</i>
        </a>
      </footer>
    </div>
  );
};

export default App;
