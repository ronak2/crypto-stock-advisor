import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../App.css';
import '../styles/Forum.css';
import styled from 'styled-components';



export default function Forum() {

    const [active, setActive] = React.useState(0);

    const Button = styled.button`
    /* Same as above */
    `;
    const ButtonToggle = styled(Button)`
    opacity: 0.6;
    ${({ active }) =>
        active &&
        `
        opacity: 1;
    `}
    `;
    const ButtonGroup = styled.div`
    display: flex;
    `;
    const types = ['Crypto', 'Stocks', 'General'];
 
  return (
    <html>
      <head>

      </head>
      <body>
        <div className='PageContainer'>
          <h1>Forum page coming soon...</h1>

          <ButtonGroup>
            {types.map(type => (
                <ButtonToggle className='forumButton'
                key={type}
                active={active === type}
                onClick={() => setActive(type)}
                >
                {type}
                </ButtonToggle>
            ))}
          </ButtonGroup>
        </div>
      </body>
    </html>
    
    );
}
