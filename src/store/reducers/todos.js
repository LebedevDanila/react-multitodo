const initalState = {
	todos: JSON.parse(localStorage.getItem('todos') || '[]'),
	colors: [
		'#C9D1D3',
		'#42B883',
		'#64C4ED',
		'#FFBBCC',
		'#B6E6BD',
		'#C355F5',
		'#795548',
		'#FF6464'
	],
	loading: true
}

export default function todosReducer(state = initalState, action) {
	switch(action.type) {
		case 'ADD_TODO':
			return {
				...state,
				todos: [...state.todos, action.todo]
			}
		case 'REMOVE_TODO':
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== action.todoId)
			}
		case 'ADD_TASK':
			return {
				...state,
				todos: state.todos.filter(todo => {
					if(todo.id === action.todoId) {
						todo.tasks.push(action.task)
					}
					return todo
				})
			}
		case 'REMOVE_TASK':
			return {
				...state,
				todos: state.todos.filter(todo => {
					if(todo.id === action.todoId) {
						todo.tasks.splice(action.taskId, 1)
					}
					return todo
				})
			}
		case 'COMPLETE_TASK':
			return {
				...state,
				todos: state.todos.filter(todo => {
					if(todo.id === action.todoId) {
						todo.tasks[action.taskId].status = 'complete'
					}
					return todo
				})
			}
		default:
			return state
	}
}