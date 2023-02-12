import React, { useEffect, useState, useRef } from "react";

const Todo = ({todo})=> {
	const log = console.log;
	const del = useRef(null);
	const add = useRef(null);
	const inp = useRef("");
	const [todoList,setTodo] = useState(todo)
	const [array,setArray] = useState([])

	useEffect(() => {
		todoList.length && (()=> {
	    let li = document.querySelectorAll('.collection-item');	
			li.forEach((e)=> {
					e.style.transition='.3s';
					/*e.onclick =()=>
						{
							e.classList.toggle('cyan');
							e.classList.toggle('white-text');
							e.classList.contains('cyan') ? array.push(e.innerText) : 
							array.filter((a,idx)=> {
								return a === e.innerText && array.splice(idx,1)
							})
							let arr = [];
							li.forEach(e=>
									{
										arr.push(e.classList[1])
									});
									arr.includes('cyan') ? 
										del.current.removeAttribute('disabled') :
										del.current.setAttribute('disabled','disabled')
						}*/
					let px = 0;
					let pw = 0;
					let ml;
					e.onmousedown=(el)=> {						
						px = el.clientX;
						el = el || window.event;
						el.preventDefault();
						document.onmousemove=(d)=> {
							e.classList.replace('cyan','red');
							d = d || window.event;
							d.preventDefault();
							pw = px - d.clientX;
							ml = e.offsetLeft - pw;
							e.style.left = ml + 'px';
							log(ml)
							if (ml > 100) {	
								e.classList.add('red');									
							}else {
								e.classList.replace('red','cyan');	
								e.style.left = '0px';
							}
						}
						document.onmouseup = ()=>{
							document.onmouseup = null;
    						document.onmousemove = null;
    						if (ml > 100){
	    						e.style.left = '100%';
										setTimeout(()=>
											e.remove()
											,300)
								}
						};
					}
					})
					

		})()					
		del.current.onclick = ()=> {
			todoList.length ? (
				document.querySelectorAll('.collection-item').forEach((e)=> 
                        	(() => e.classList.contains('cyan') && (
                        			(() => {
		                        		e.classList.replace('cyan','red');
	                        			setTimeout(()=> e.remove(),300)
	                        			let obj = todoList
	                        			array.filter((a,idx)=> {
	                        				return obj = obj.filter(f=> f.content !== a)
										})
                        				setTodo(obj)
                        				setArray([])
                        		})()))()
                        )) : alert("Nothing to Delete")
        }
        add.current.onclick = ()=> {
        				(()=>inp.current.value ?
        										(()=> {
        											let list = {
        												id:todoList.length ? (todoList[todoList.length -1].id + 1) : 0,
        												content:inp.current.value
        											};
        											setTodo([...todoList,list])
        										})() : alert(':0'))()
        				inp.current.value = ""
        				log(todoList)
        }
	})
	return (
		<>
		<div className="collection">
			<button ref={del} className="waves-effect waves-light btn">Delete</button>
			<button ref={add} className="waves-effect waves-light btn right"> 
				<i className="material-icons">add</i>
			</button>
			<div className="input-field col s6">
	          <input ref={inp} id="job" type="text" className="validate" />
	          <label htmlFor="job">Add Job</label>
	        </div>
	    </div>
		<div className="collection">
				{todoList.length ? todoList.map((t)=> {
									return (
										<div key={t.id} className="collection-item" style={{position:"relative"}}>
											<p>{t.content}</p>
										</div>
										)
									}
								) : <p>Empty List</p>
				}
		</div>
		
</>
	)
}

export default Todo