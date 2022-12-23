import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, coursesListDetails: []}

  componentDidMount() {
    this.getCourses()
  }

  onClickRetry = () => {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`

    console.log(apiUrl)

    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok === true) {
      const coursesData = await response.json()
      console.log(coursesData)
      const courseDetails = coursesData.course_details
      console.log(courseDetails)
      const updatedCoursesList = {
        id: courseDetails.id,
        imageUrl: courseDetails.image_url,
        name: courseDetails.name,
        description: courseDetails.description,
      }

      this.setState({
        coursesListDetails: updatedCoursesList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {coursesListDetails} = this.state
    const {description, imageUrl, name} = coursesListDetails

    return (
      <>
        <h1 className="course-heading">Courses</h1>
        <ul>
          <li className="course-item-details-card">
            <img src={imageUrl} className="course-item-details" alt={name} />
            <div className="item-card">
              <h1 className="heading">{name}</h1>
              <p className="description">{description}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      />
      <h1 className="failure-msg">Oops! Something Went Wrong</h1>
      <p className="failure-details">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCourses = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="course-container">{this.renderCourses()}</div>
      </div>
    )
  }
}
export default CourseItemDetails
