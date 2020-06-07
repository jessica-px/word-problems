import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components'

// -------------------------------------------------------------------------- //
//                              Main Component                                //
// -------------------------------------------------------------------------- //

export const NavBar = () => {
  return (
    <SideBar>
      <NavLink
        url='/'
        name='Home'
      />
      <NavLink
        url='/years'
        name='Years'
      />
    </SideBar>
  )
}

// -------------------------------------------------------------------------- //
//                               Sub-Components                               //
// -------------------------------------------------------------------------- //

const NavLink = ({url, name}: any) => {
  const currURL = useLocation().pathname;
  const isCurrent = currURL === url;

  return (
    <LinkStyle to={url} isHighlighted={isCurrent}>{name}</LinkStyle>
  )
}

// -------------------------------------------------------------------------- //
//                              Styled Components                             //
// -------------------------------------------------------------------------- //

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  background-color: #d1e8df;
  height: 100%;
  padding-top: 100px;
`

const LinkStyle = styled(Link)<{ isHighlighted: boolean }>`
  text-decoration: none;
  color: #03363d;
  padding: 15px 50px;
  border-style: none;
  border-left: 12px solid transparent;
  ${props => props.isHighlighted && css`
    border-left: 12px solid #03363d;
    font-weight: 600;
  `}
`
