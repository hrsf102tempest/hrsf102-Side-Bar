import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import styled from 'styled-components';
import TimeSlotsContainer from '../containers/reservations/TimeSlotsContainer';
import PeoplePerResContainer from '../containers/reservations/PeoplePerResContainer';
import FindTableContainer from '../containers/reservations/FindTableContainer';
import CalendarContainer from '../containers/reservations/CalendarContainer';
import Cal from './calendarIcon';
import CalendarFull from './reservation-pieces/calendarFull';

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
  margin: 0;
  display: inline-block;
  position: relative;
  bottom: 6px;
`;

Title.displayName = 'Title';

const Wrapper = styled.section`
  display: inline-block;
  height: 25px;
  width: 265px;
  margin: 10px 0px 5px 0;
  text-align: left;
  padding: 5px 15px 5px 0;
`;

Wrapper.displayName = 'ResWrapper';

const ResBox = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  height: 164px;
  width: 298px;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  background-color: white;
  display: inline-block;

  :focus {
  -webkit-appearance: none;
  }
`;

ResBox.displayName = 'ResBox';

const CalWrapper = styled.div`
  display: inline-block;
  margin: 0px 12px;
`;

CalWrapper.displayName = 'CalWrapper';

const SecretDiv = styled.div`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  display: inline-block;
  background-color: white;
  position: relative;
  bottom: 70px;
  left: 9px;
  z-index: 3;
`;

SecretDiv.displayName = 'SecretDiv';

class Reservations extends React.Component {
  componentDidMount() {
    // function that gets all search params
    const parseQueryString = () => {
      const str = window.location.search;
      const objURL = {};
      str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
        objURL[$1] = $3;
      });
      return objURL;
    };
    const params = parseQueryString();
    const idParam = params.id;
    this.fetch(idParam);
  }

  fetch(id) {
    $.ajax({
      url: `http://localhost:3001/businesses/${id}`,
      success: (response) => {
        const { newBusinessSelected } = this.props;
        newBusinessSelected(response[0]);
      },
    });
  }


  render() {
    const { showCalendar } = this.props;

    return (
      <ResBox>
        <Wrapper>
          <CalWrapper>
            { Cal(24) }
          </CalWrapper>
          <Title>Make a Reservation</Title>
        </Wrapper>
        <CalendarContainer />
        <TimeSlotsContainer />
        <PeoplePerResContainer />
        <FindTableContainer />

        <SecretDiv visible={showCalendar}>
          <CalendarFull />
        </SecretDiv>
      </ResBox>
    );
  }
}

Reservations.propTypes = {
  newBusinessSelected: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool.isRequired,
};

export default Reservations;
