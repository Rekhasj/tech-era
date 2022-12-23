import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = prop => {
  const {coursesDetails} = prop
  const {logoUrl, name, id} = coursesDetails
  return (
    <Link to={`/courses/${id}`}>
      <li className="course-item-card">
        <img src={logoUrl} alt={name} className="course-image" />
        <p className="course-item-heading">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
