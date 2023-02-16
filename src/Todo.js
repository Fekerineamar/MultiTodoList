import React, { useEffect, useState, useRef } from "react";

const Todo = ({ todo }) => {
  const del = useRef(null);
  const add = useRef(null);
  const inp = useRef(null);
  const [todoList, setTodo] = useState(todo);
  const [array, setArray] = useState([]);

  useEffect(() => {
    // if Todolist not Empty do the following action
    todoList.length &&
      (() => {
        let li = document.querySelectorAll(".collection-item");
        li.forEach((e) => {
          e.style.transition = ".3s";
          e.onclick = () => {
            e.classList.toggle("cyan");
            e.classList.toggle("white-text");
            e.classList.contains("cyan")
              ? array.push(Number(e.id))
              : array.filter((a, idx) => {
                  return a === Number(e.id) && array.splice(idx, 1);
                });
            let arr = [];
            li.forEach((e) => {
              arr.push(e.classList[1]);
            });
            arr.includes("cyan")
              ? del.current.removeAttribute("disabled")
              : del.current.setAttribute("disabled", "disabled");
          };
          // on hover Edit this element

          e.onmouseenter = () => {
            e.querySelector("img").onclick = () => {
              let p = prompt(`Edit ${e.innerText}`);
              p && (e.querySelector("p").innerText = p);
            };
          };
          // on swipe right remove this element
          let px = 0,
            pl = 0,
            ml;
          e.onmousedown = (el) => {
            el = el || window.event;
            el.preventDefault();
            e.style.transition = "";
            px = el.clientX;
            document.onmousemove = (d) => {
              d = d || window.event;
              d.preventDefault();
              pl = px - d.clientX;
              px = d.clientX;
              ml = e.offsetLeft - pl;
              e.style.left = ml + "px";
              if (ml > 100) {
                e.classList.contains("cyan")
                  ? e.classList.replace("cyan", "red")
                  : e.classList.add("red", "white-text");
              }
            };
            document.onmouseup = () => {
              document.onmouseup = null;
              document.onmousemove = null;
              if (ml > 100) {
                e.style.left = "100%";
                setTimeout(() => e.remove(), 300);
                let obj = todoList;
                obj = obj.filter((f) => f.id !== Number(e.id));
                array.length &&
                  array.filter((a, idx) => {
                    return a === Number(e.id) && array.splice(idx, 1);
                  });
                setTodo(obj);
              } else {
                e.classList.replace("red", "cyan");
                e.style.left = "0px";
              }
            };
          };
        }); // Edit this Element with prompt window, `You can make a modal ;)`.
      })();

    // on dblclick edit this element
    del.current.onclick = () => {
      todoList.length
        ? document.querySelectorAll(".collection-item").forEach((e) =>
            (() =>
              e.classList.contains("cyan") &&
              (() => {
                e.classList.replace("cyan", "red");
                setTimeout(() => e.remove(), 300);
                del.current.setAttribute("disabled", "disabled");
                let obj = todoList;
                array.filter((a) => {
                  return (obj = obj.filter((f) => f.id !== a));
                });
                setTodo(obj);
                setArray([]);
              })())()
          )
        : alert("Nothing to Delete");
    };
    add.current.onclick = () => {
      (() =>
        /\w+/.test(inp.current.value)
          ? (() => {
              let list = {
                id: todoList.length ? todoList[todoList.length - 1].id + 1 : 0,
                content: inp.current.value.trim(),
              };
              setTodo([...todoList, list]);
            })()
          : alert("please Add a True phrase!"))();
      inp.current.value = "";
    };
  });
  return (
    <>
      <div className="collection">
        <button ref={del} className="waves-effect red btn" disabled>
          Delete <i className="material-icons right">delete_forever</i>
        </button>
        <button ref={add} className="waves-effect cyan btn-floating right">
          <i className="small material-icons">add</i>
        </button>
        <div className="input-field col s6">
          <input ref={inp} id="job" type="text" className="validate" />
          <label htmlFor="job">Add Job</label>
        </div>
      </div>
      <div className="collection">
        {todoList.length ? (
          todoList.map((t) => {
            return (
              <div
                key={t.id}
                id={t.id}
                className="collection-item"
                style={{ position: "relative" }}
              >
                <p style={{ display: "inline-block" }}>{t.content}</p>
                <img
                  className="right hide"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABRklEQVR4nO2Wv0rFMBSHM/gCPsAVB9dLm9+Xzp0ER0cnQQUFHRS84KBOXnFwd/QFHH0A0cVR3L3i5CL+mVwElQMtlILbTa5DPwhN0uE75yRt4lxHRCQNJN0Buy41wImkEbBYPY+TySUdAU9Zls3aOITQAx6A0ySZAz8hhNXW/IykR0k7UeWSRiYHPrz3C833Ni/pKra8Z2OTN4MoiiIHXkIIS9HlNXUQVnaTS1p3qeQ1kraB7yhytXZ7mzzPsyrzzU4+NiQNJ1n2YSd3XdkbdBtOMT41YN/O7b/+7fWpBmyMXW5UN5f3EELhUq650e/3pyV9SdqS9NoMIrrcAOaBe+t771fqIJLIDWAPOG+MD4C3qGveRNIFcA1cAs+SPoFbYNmlADgEzoA1K3tZllPRpd77OUlMopnbsr6xO90kmi139Ar/e34BT/f8qE12p/sAAAAASUVORK5CYII="
                  alt="Edit"
                />
              </div>
            );
          })
        ) : (
          <h4 className="center">Empty</h4>
        )}
      </div>
    </>
  );
};

export default Todo;
