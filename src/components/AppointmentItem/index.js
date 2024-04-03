import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, changeStarImg} = props
  const {id, name, date, isStared} = eachAppointment
  const onChangeStar = () => {
    changeStarImg(id)
  }
  const starImg = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="each-list-appointment">
      <div className="item-top">
        <p className="appointment-name">{name}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onChangeStar}
        >
          <img src={starImg} alt="star" />
        </button>
      </div>
      <p className="appointment-date">{date}</p>
    </li>
  )
}

export default AppointmentItem
