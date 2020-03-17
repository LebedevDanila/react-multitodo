import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {addTask, removeTask, completeTask} from '../store/actions/todos'

import closeImg from '../assets/icons/close.svg'
import addImg from '../assets/icons/add.svg'
import editImg from '../assets/icons/edit.svg'

function Todo(props) {
	const [isOpenForm, setIsOpenForm] = useState(false)
	const [inputField, setInputField] = useState('')

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(props.todos))
	})

	const submitTask = (e) => {
		e.preventDefault()

		if(!inputField) {
			alert('Поле не может быть пустым!')
			return false
		}

		const newTask = {
			title: inputField,
			status: 'active'
		}

		props.addTask(newTask, props.todo.id)

		setInputField('')
	}

	return (
		<div className="todos__item">
	    <div className="todos__title">
	    	<span style={{color: props.todo.color}}>{props.todo.name}</span>
	    	<img src={editImg} alt="edit" />
	    </div>

	    {props.todo.tasks.length ? (
				<div className="todos__tasks">
		    	{props.todo.tasks.map((task, idx) => {
			      if(task.status === 'active') {
		    			return (
		    				<div
		    					className="todos__task active"
		    					key={idx}
		    					onClick={() => props.completeTask(idx, props.todo.id)}
		    				>
									<div className="todos__task-checkbox"></div>
									<span className="todos__task-text">{task.title}</span>
					      </div>
		    			)
		    		}
		    	})}
		    	{props.todo.tasks.map((task, idx) => {
		    		if(task.status === 'complete') {
		    			return (
		    				<div className="todos__task complete" key={idx}>
									<div className="todos__task-checkbox">
										<svg viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
												stroke="#B3B3B3" strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<span className="todos__task-text">{task.title}</span>
									<img
										className="todos__task-close"
										src={closeImg}
										alt="close"
										onClick={() => props.removeTask(idx, props.todo.id)}
									/>
					      </div>
		    			)
		    		}
		    	})} 
		    </div>
	    ) : (
				<div className="not-found">Задач пока нету</div>
	    )}

	    {isOpenForm ? (
				<form className="task-add" onSubmit={(e) => submitTask(e)}>
					<input
						className="task-add__field"
						type="text"
						placeholder="Текст задачи"
						value={inputField}
						onChange={(e) => setInputField(e.target.value)}
					/>
					<input className="task-add__submit" type="submit" value="Добавить задачу" />
					<button className="task-add__cancel" onClick={() => setIsOpenForm(false)}>Отмена</button>
		    </form>
	    ) : (
				<div className="btn-add task-add__btn" onClick={() => setIsOpenForm(true)}>
		      <div className="btn-add__content">
						<img src={addImg} alt="add" />
		      	<span>Добавить задачу</span>
		      </div>
		    </div>
	    )}

	  </div>
	);
}

const mapStateToProps = state => {
	return {
		todos: state.todos.todos
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addTask: (task, todoId) => dispatch(addTask(task, todoId)),
		removeTask: (taskId, todoId) => dispatch(removeTask(taskId, todoId)),
		completeTask: (taskId, todoId) => dispatch(completeTask(taskId, todoId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)