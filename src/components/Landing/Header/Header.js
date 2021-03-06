import React from 'react';
import { Link } from 'react-router-dom';
import { StyledButton, buttonTheme } from '../Landing-styles';
import { HeaderContainer } from './Header-styles';

const Header = () => (
  <HeaderContainer>
    <h2 className='cta-title'>
      Interviewing isn't easy. That doesn't mean it has to be
      stressful
    </h2>
    <div className='cta-button'>
      <Link className='link' to='/register'>
        <StyledButton theme={buttonTheme}>Sign Up</StyledButton>
      </Link>
    </div>
  </HeaderContainer>
);

export default Header;
