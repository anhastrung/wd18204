import './App.css'
import FooterPage from './component/Footer'
import HeaderPage from './component/Header'
import HomePage from './component/Home'

function App() {

  return (
    <>
      <div className="container">
        <HeaderPage />
        <HomePage />
        <FooterPage />
      </div>
    </>
  )
}

export default App
