import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom"

import {addTodo, removeTodo} from '../store/actions/todos'

import menuImg from '../assets/icons/menu.svg'
import closeImg from '../assets/icons/close.svg'
import closeFormImg from '../assets/icons/close-form.svg'
import addImg from '../assets/icons/add.svg'

function Sidebar(props) {
	const [isOpenForm, setIsOpenForm] = useState(false)
	const [inputField, setInputField] = useState('')
	const [colorPicker, setColorPicker] = useState('#C9D1D3')

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(props.todos))
	})

	const submitTodo = (e) => {
		e.preventDefault()
		
		if(!inputField) {
			console.log('Поле не может быть пустым!')
			return false
		}
		
		const newTodo = {
			id: Date.now(),
			name: inputField,
			color: colorPicker,
			tasks: []
		}

		props.addTodo(newTodo)

		setInputField('')
	}

	return (
		<div className="todos__sidebar">
	    <NavLink
	    	exact
	    	to="/"
	    	activeClassName="active"
	    	className="todos__folder all"
	    >
	      <img className="todos__folder-icon" src={menuImg} alt="folder-icon" />
	      <span className="todos__folder-text">Все задачи</span>
	    </NavLink>
	    <div className="todos__folders">
	    	{props.todos.map(todo => (
					<NavLink
						to={`/todo/${todo.id}`}
						activeClassName="active"
						className="todos__folder"
						key={todo.id}
					>
		        <div style={{background: todo.color}} className="todos__folder-circle"></div> 
		        <span className="todos__folder-text">{todo.name}</span>
		        <img
		        	className="todos__folder-close"
		        	src={closeImg}
		        	alt="remove"
		        	onClick={(e) => {
		        		e.preventDefault()
		        		props.removeTodo(todo.id)
		        	}}
		        />
		      </NavLink>
	    	))}
	    </div>
	    <div className="btn-add folder-add__btn">
				<div
					className="btn-add__content"
					onClick={() => setIsOpenForm(!isOpenForm)}
				>
					<img className={isOpenForm ? 'rotate' : ''} src={addImg} alt="add" />
      		<span>{isOpenForm ? 'Закрыть форму' : 'Добавить папку'}</span>
				</div>

				{isOpenForm ? (
					<form className="folder-add" onSubmit={(e) => submitTodo(e)}>
		     		<img
		     			className="folder-add__cancel"
		     			src={closeFormImg}
		     			alt="cancel"
		     			onClick={() => setIsOpenForm(!isOpenForm)}
		     		/>
						<input
							className="folder-add__field"
							type="text"
							placeholder="Название папки"
							value={inputField}
							onChange={(e) => setInputField(e.target.value)}
						/>
						<div className="folder-add__colors">
							{props.colors.map((color, idx) => (
								<div
									className={colorPicker === color ? "folder-add__color active" : "folder-add__color"}
									style={{background: color}}
									onClick={() => setColorPicker(color)}
									key={idx}
								></div>
							))}
						</div>
						<input className="folder-add__submit" type="submit" value="Добавить" />
			    </form>
				) : false}

	    </div>
	  </div>
	)
}

const mapStateToProps = state => {
	return {
		todos: state.todos.todos,
		colors: state.todos.colors
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addTodo: todo => dispatch(addTodo(todo)),
		removeTodo: todoId => dispatch(removeTodo(todoId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)