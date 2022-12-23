import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="main-container">
    <Header />
    <div className="not-found-container">
      <img
        className="not-found-image"
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  </div>
)

export default NotFound
