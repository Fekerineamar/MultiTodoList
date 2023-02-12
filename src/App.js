import Todo from "./Todo"

const App = ()=> {
  const  state = {
    todo:[
      {id:1,content:"Web Developers"},
      {id:2,content:"Web Designers"},
      {id:3,content:"Engineers"},
      ]      
    }
  return (
    <div className="todo-app container">
    <Todo todo={state.todo}/> 
    </div>
  );
}

export default App;