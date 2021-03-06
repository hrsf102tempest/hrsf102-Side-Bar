import { connect } from 'react-redux';
import PeoplePerRes from '../../components/reservation-pieces/peoplePerRes';

const mapStateToProps = (state) => {
  const props = {
    maxPeople: state.ReservationsReducer === null ? 0 : state.ReservationsReducer.people_per_reservation,
  };
  return props;
};

const PeoplePerResContainer = connect(
  mapStateToProps,
  null,
)(PeoplePerRes);

export default PeoplePerResContainer;
