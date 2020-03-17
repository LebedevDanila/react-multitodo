import React, {Fragment} from 'react'
import {connect} from 'react-redux'

import Todo from '../containers/Todo'

function Single(props) {
	const foundItem = props.todos.find(todo => todo.id === Number(props.match.params.id))
	
	if(!foundItem) {
		props.history.push('/')
		return false
	}

	return (
		<Fragment>
      <Todo todo={foundItem} />
		</Fragment>
	)
}

const mapStateToProps = state => {
	return {
		todos: state.todos.todos
	}
}

export default connect(mapStateToProps)(Single)