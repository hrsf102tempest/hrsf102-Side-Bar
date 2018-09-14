import React from 'react';
import styled from 'styled-components';

const StyledDayEmpty = (dayNum) => {
  return styled.div`
    display: inline-block;
    text-align: center;
    height: 30px;
    width: 32px;
    border-top: 1px solid rgb(204, 204, 204);
    border-right: 1px ${dayNum === 6 ? 'none' : 'solid'} rgb(204, 204, 204);
    border-bottom: 0px none rgb(51, 51, 51);
    border-left: 0px none rgb(51, 51, 51);
    padding: 3px;
    line-height: 30px;
    padding: 3px;
    line-height: 30px;
    color: rgba(0, 0, 0, 0);

    &:hover {
      background: rgb(240, 243, 248);
      cursor: pointer;
      box-shadow: rgb(205, 218, 226) 0px 0px 2px 0px inset;
    }
  `;
};

const ValidDay = (dayNum) => {
  return styled.div`
    display: inline-block;
    text-align: center;
    height: 30px;
    width: 32px;
    border-top: 1px solid rgb(204, 204, 204);
    border-right: 1px ${dayNum === 6 ? 'none' : 'solid'} rgb(204, 204, 204);
    border-bottom: 0px none rgb(51, 51, 51);
    border-left: 0px none rgb(51, 51, 51);
    padding: 3px;
    line-height: 30px;

    &:hover {
      background: rgb(240, 243, 248);
      cursor: pointer;
      box-shadow: rgb(205, 218, 226) 0px 0px 2px 0px inset;
    }
  `;
};

ValidDay.displayName = 'ValidDay';

const CurrentDay = (dayNum) => {
  return styled.div`
    display: inline-block;
    text-align: center;
    font-weight: 700;
    height: 30px;
    width: 32px;
    border-top: 1px solid rgb(204, 204, 204);
    border-right: 1px ${dayNum === 6 ? 'none' : 'solid'} rgb(204, 204, 204);
    border-bottom: 0px none rgb(51, 51, 51);
    border-left: 0px none rgb(51, 51, 51);
    padding: 3px;
    line-height: 30px;
    padding: 3px;
    line-height: 30px;
    color: white;
    background-color: rgba(207, 18, 0, 0.8);

    &:hover {
      cursor: pointer;
    }
  `;
};

CurrentDay.displayName = 'CurrentDay';


const InvalidDay = (dayNum) => {
  return styled.div`
    display: inline-block;
    text-align: center;
    color: rgb(204, 204, 204);
    height: 30px;
    width: 32px;
    border-top: 1px solid rgb(204, 204, 204);
    border-right: 1px ${dayNum === 6 ? 'none' : 'solid'} rgb(204, 204, 204);
    border-bottom: 0px none rgb(51, 51, 51);
    border-left: 0px none rgb(51, 51, 51);
    padding: 3px;
    line-height: 30px;
    padding: 3px;
    line-height: 30px;

    &:hover {
      cursor: not-allowed;
    }
  `;
};

InvalidDay.displayName = 'InvalidDay';

const StyledView = styled.div`
  font-size: 14px;
`;

const StyledWeek = styled.div`
display: inline-block;
`;

const Days = (props) => {
  const { month, year, daysOut, date, newViewedDate, } = props;

  const divDate = (targetDay, targetMonth = month, targetYear = year) => {
    const result = new Date(targetYear, targetMonth, targetDay);
    return result;
  };

  const todaysMonth = new Date().getMonth();
  const todaysYear = new Date().getFullYear();
  const farthest = ((dayCount) => {
    const result = new Date();
    result.setDate(result.getDate() + dayCount);
    return result;
  })(daysOut);
  const currentDate = divDate(new Date().getDate(), todaysMonth, todaysYear);
  console.log('currentDate', currentDate);

  const calendarMatrix = (monthGiven, yearGiven) => {
    const longMonths = [0, 2, 4, 6, 7, 9, 11];
    const firstDay = (new Date(yearGiven, monthGiven)).getDay();
    const matrix = Array(6).fill(null).map(() => Array(7).fill(undefined));
    let daysPerMonth = 30;

    if (longMonths.indexOf(monthGiven) !== -1) {
      daysPerMonth = 31;
    }

    if (monthGiven === 1) {
      if (yearGiven % 4 === 0) {
        daysPerMonth = 29;
      } else {
        daysPerMonth = 28;
      }
    }

    for (let i = 0; i < daysPerMonth; i += 1) {
      matrix[Math.floor((firstDay + i) / 7)][(firstDay + i) % 7] = i + 1;
    }
    return matrix;
  };

  const calendarDays = calendarMatrix(month, year).map((days) => {
    const week = days.map((day, index) => {
      const dayDate = divDate(day);
      if (day === undefined) {
        const EmptyDiv = StyledDayEmpty(index);
        return (
          <EmptyDiv>
            { 'a' }
          </EmptyDiv>
        );
      }

      if (dayDate < currentDate) {
        const Invalid = InvalidDay(index);
        return (
          <Invalid>
            { day }
          </Invalid>
        );
      }

      if (dayDate.getDate() === date.getDate() && dayDate.getMonth() === date.getMonth()) {
        const Current = CurrentDay(index);
        return (
          <Current onClick={() => newViewedDate(dayDate)}>
            { day }
          </Current>
        );
      }

      if (dayDate >= currentDate && dayDate <= farthest) {
        const Valid = ValidDay(index);
        return (
          <Valid onClick={() => newViewedDate(dayDate)}>
            { day }
          </Valid>
        );
      }

      const Invalid = InvalidDay(index);
      return (
        <Invalid>
          { day }
        </Invalid>
      );
    });

    return (
      <StyledWeek>
        { week }
      </StyledWeek>
    );
  });

  return (
    <StyledView>
      { calendarDays }
    </StyledView>
  );
};

export default Days;
