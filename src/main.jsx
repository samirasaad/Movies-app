import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <App />
)
