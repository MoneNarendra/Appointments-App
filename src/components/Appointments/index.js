import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    appointmentName: '',
    appointmentDate: '',
    isFiltred: false,
  }

  filterStaredAppontement = () => {
    this.setState(prevStste => ({
      isFiltred: !prevStste.isFiltred,
    }))
  }

  addNewAppointment = event => {
    event.preventDefault()
    const {appointmentDate, appointmentName} = this.state
    const objDate = appointmentDate
      ? format(new Date(appointmentDate), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      name: appointmentName,
      date: objDate,
      isStared: false,
    }

    this.setState(preState => ({
      appointmentsList: [...preState.appointmentsList, newAppointment],
      appointmentName: '',
      appointmentDate: '',
    }))
  }

  changeStarImg = id => {
    this.setState(preState => ({
      appointmentsList: preState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return {...eachAppointment}
      }),
    }))
  }

  getFilteredList = () => {
    const {isFiltred, appointmentsList} = this.state

    if (isFiltred) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStared !== false,
      )
    }
    return appointmentsList
  }

  addAppointmentName = event => {
    this.setState({appointmentName: event.target.value})
  }

  addAppointmentDate = event => {
    this.setState({appointmentDate: event.target.value})
  }

  render() {
    const {appointmentName, appointmentDate, isFiltred} = this.state
    const filterButton = isFiltred ? 'filtered' : 'not-filtered'
    const filteredList = this.getFilteredList()
    return (
      <div className="bg-container">
        <div className="innner-container">
          <h1 className="main-heading">Add Appointment</h1>
          <div className="top-section">
            <form
              className="appointment-text-container"
              onSubmit={this.addNewAppointment}
            >
              <label htmlFor="title" className="input-text">
                TITLE
              </label>
              <input
                id="title"
                type="text"
                className="input-ele"
                placeholder="Title"
                value={appointmentName}
                onChange={this.addAppointmentName}
              />
              <label htmlFor="date" className="input-text">
                DATE
              </label>
              <input
                id="date"
                type="date"
                className="input-ele"
                value={appointmentDate}
                onChange={this.addAppointmentDate}
              />
              <div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
            <div className="appointment-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-img"
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="botton-section">
            <div className="appointments-header">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`stared-button ${filterButton}`}
                onClick={this.filterStaredAppontement}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list-items">
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  changeStarImg={this.changeStarImg}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
