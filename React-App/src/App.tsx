import { useState } from 'react'
import './App.css'
import SeatReservation from './Fetchs/SeatReservation'
function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <SeatReservation />
      </header>
    </div>
  )
}

export default App
