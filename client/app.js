import React from 'react'

import {MenuStackable} from './components'
import {ContentContextProvider} from './state/content'
import Routes from './routes'

import './styles/app.scss'

const App = () => {
  return (
    <div className="app-container">
      <ContentContextProvider>
        <MenuStackable />
        <div
          className="content-body"
          style={{height: 'inherit', width: 'inherit'}}
        >
          <Routes />
        </div>
      </ContentContextProvider>
    </div>
  )
}

export default App
