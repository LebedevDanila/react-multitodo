import React, {Fragment} from 'react'
import {connect} from 'react-redux'

import Todo from '../containers/Todo'

function Home(props) {
	return (
		<Fragment>
			{props.todos.length ? (
				props.todos.map(todo => <Todo todo={todo} key={todo.id} />) 
			) : (
				<div className="not-found">У вас пока нету задач</div>
			)}
		</Fragment>
	)
}

const mapStateToProps = state => {
	return {
		todos: state.todos.todos
	}
}

export default connect(mapStateToProps)(Home)