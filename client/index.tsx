import React from 'react'
import {createRoot} from 'react-dom/client'
import {HashRouter} from 'react-router-dom'
import App from './app'

import 'semantic-ui-css/semantic.min.css'

const container = document.getElementById('app')
if (!container) throw new Error('Root element #app not found')

createRoot(container).render(
  <HashRouter>
    <App />
  </HashRouter>,
)
