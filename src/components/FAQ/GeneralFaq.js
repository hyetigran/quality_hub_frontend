import React from 'react';
import { connect } from 'react-redux';
import {
  BodyDiv,
  FAQContainer,
  AskedQuestionDiv,
  AnsweredQuestionDiv,
} from './FaqStyles';
import * as actionCreators from '../../state/actions/faqActions';

import plusIcon from '../../img/plus-icon.svg';
import minusIcon from '../../img/minus-icon.svg';

const icons = { plusIcon, minusIcon };

const General = props => {
  const {
    faqTextState1,
    faqTextState2,
    faqTextState3,
    showText1,
    showText2,
    showText3,
    faqImageState1,
    faqImageState2,
    faqImageState3,
    showImage1,
    showImage2,
    showImage3,
  } = props;

  const getImage1 = () => (faqImageState1 ? 'plusIcon' : 'minusIcon');
  const getImage2 = () => (faqImageState2 ? 'plusIcon' : 'minusIcon');
  const getImage3 = () => (faqImageState3 ? 'plusIcon' : 'minusIcon');

  return (
    <div>
      <BodyDiv>
        <FAQContainer>
          <AskedQuestionDiv
            onClick={display => {
              showText1(display);
              showImage1(display);
            }}
          >
            <p>What is DevCoach?</p>
            {<img src={icons[getImage1()]} />}
          </AskedQuestionDiv>
          {faqTextState1 && (
            <AnsweredQuestionDiv>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla id tristique magna, et gravida nibh. Phasellus
              tempus sem a mi consectetur, ac ultricies mauris
              condimentum. Duis nec metus ante. Morbi feugiat mauris
              non lectus sodales sodales. Proin eu auctor elit,
              facilisis tincidunt velit. Sed in lectus non urna varius
              eleifend ac ut ligula. In eleifend at mi in molestie.
            </AnsweredQuestionDiv>
          )}

          <AskedQuestionDiv
            onClick={display => {
              showText2(display);
              showImage2(display);
            }}
          >
            <p>How does it work?</p>
            {<img src={icons[getImage2()]} />}
          </AskedQuestionDiv>
          {faqTextState2 && (
            <AnsweredQuestionDiv>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla id tristique magna, et gravida nibh. Phasellus
              tempus sem a mi consectetur, ac ultricies mauris
              condimentum. Duis nec metus ante. Morbi feugiat mauris
              non lectus sodales sodales. Proin eu auctor elit,
              facilisis tincidunt velit. Sed in lectus non urna varius
              eleifend ac ut ligula. In eleifend at mi in molestie.
            </AnsweredQuestionDiv>
          )}
          <AskedQuestionDiv
            onClick={display => {
              showText3(display);
              showImage3(display);
            }}
          >
            <p>How does it work?</p>
            {<img src={icons[getImage3()]} />}
          </AskedQuestionDiv>
          {faqTextState3 && (
            <AnsweredQuestionDiv>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla id tristique magna, et gravida nibh. Phasellus
              tempus sem a mi consectetur, ac ultricies mauris
              condimentum. Duis nec metus ante. Morbi feugiat mauris
              non lectus sodales sodales. Proin eu auctor elit,
              facilisis tincidunt velit. Sed in lectus non urna varius
              eleifend ac ut ligula. In eleifend at mi in molestie.
            </AnsweredQuestionDiv>
          )}
        </FAQContainer>
      </BodyDiv>
    </div>
  );
};

export default connect(state => state, actionCreators)(General);