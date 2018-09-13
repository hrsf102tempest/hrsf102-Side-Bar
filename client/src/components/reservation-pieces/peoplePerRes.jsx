import React from 'react';
import styled from 'styled-components';
import icon from '../../../../icon.png';
import Down from '../downArrow.jsx';

const Wrapper = styled.div`
  display: inline-block;
`;

const SelectWrapper = styled.select`
  -webkit-appearance: none;
  display: inline-block;
  padding: 8px 45px;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0);
`;

const StyledIcon = styled.img`
  height: 18px;
  width: auto;
  display: inline-block;
  padding: 5px 5px 0px 5px;
  position: absolute;
  z-index: -1;
`;

const DownWrapper = styled.div`
  display: inline-block;
  position: absolute;
  width: 0px;
  z-index: -1;
`;

const PeoplePerRes = (props) => {
  console.log('PeoplePer', props);

  const { maxPeople } = props;
  const optionText = [];

  for (let i = 1; i <= maxPeople; i += 1) {
    let text;
    if (i === 1) {
      text = '1 person';
    } else {
      text = `${i} people`;
    }
    optionText.push(text);
  }

  const options = optionText.map((filler) => {
    return (
      <option>
        { filler }
      </option>
    );
  });

  return (
    <Wrapper>
      <StyledIcon src={icon} />
      <SelectWrapper>
        { options }
      </SelectWrapper>
      <DownWrapper>
        { Down(7) }
      </DownWrapper>

    </Wrapper>
  );
};


export default PeoplePerRes;
