import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, coursesList: []}

  componentDidMount() {
    this.getCourses()
  }

  onClickRetry = () => {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/te/courses'
    console.log(apiUrl)

    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok === true) {
      const coursesData = await response.json()
      console.log(coursesData)
      const updatedCoursesList = coursesData.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))

      this.setState({
        coursesList: updatedCoursesList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {coursesList} = this.state

    return (
      <>
        <h1 className="course-heading">Courses</h1>
        <ul>
          {coursesList.map(eachCourse => (
            <CourseItem key={eachCourse.id} coursesDetails={eachCourse} />
          ))}
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

export default Home
