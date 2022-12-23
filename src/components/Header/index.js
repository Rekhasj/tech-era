import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="header-card">
    <Link to="/">
      <img
        alt="website logo"
        className="website-logo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
      />
    </Link>
  </div>
)

export default withRouter(Header)
