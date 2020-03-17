export function addTodo(todo) {
	return {
		type: 'ADD_TODO',
		todo
	}
}

export function removeTodo(todoId) {
	return {
		type: 'REMOVE_TODO',
		todoId
	}
}

export function addTask(task, todoId) {
	return {
		type: 'ADD_TASK',
		task,
		todoId
	}
}

export function removeTask(taskId, todoId) {
	return {
		type: 'REMOVE_TASK',
		taskId,
		todoId
	}
}

export function completeTask(taskId, todoId) {
	return {
		type: 'COMPLETE_TASK',
		taskId,
		todoId
	}
}