import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Sidebar from './containers/Sidebar'

import Home from './pages/Home'
import Single from './pages/Single'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <div className="todos">
        <Sidebar />
        <div className="todos__content todo">
      		<Switch>
      			<Route exact path="/" component={Home} />
      			<Route exact path="/todo/:id" component={Single} />
      			<Route component={NotFound} />
      		</Switch>
        </div>
      </div>
    </Router>
  )
}

export default App