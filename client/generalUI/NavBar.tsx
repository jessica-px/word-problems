import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components'
import EcoIcon from '@material-ui/icons/Eco';
import { PALETTE } from 'generalUI/styleConstants';

// -------------------------------------------------------------------------- //
//                              Main Component                                //
// -------------------------------------------------------------------------- //

export const NavBar = () => {
  return (
    <SideBar>
      <SiteIcon fontSize='large' color="primary" />
      <NavLink
        url='/'
        name='Home'
      />
      <NavLink
        url='/years'
        name='Years and Ages'
      />
    </SideBar>
  )
}

// -------------------------------------------------------------------------- //
//                               Sub-Components                               //
// -------------------------------------------------------------------------- //

interface NavLinkProps {
  url: string,
  name: string
}

const NavLink = ({url, name}: NavLinkProps) => {
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
  background-color: ${PALETTE.background_medium};
  padding-top: 40px;
`

interface LinkStyleProps {
  isHighlighted: boolean
}

const LinkStyle = styled(Link)<LinkStyleProps>`
  text-decoration: none;
  color: ${PALETTE.primary};
  padding: 15px 50px;
  border-style: none;
  border-left: 12px solid transparent;
  ${props => props.isHighlighted && css`
    border-left: 12px solid ${PALETTE.primary};
    font-weight: 600;
  `}
`
const SiteIcon = styled(EcoIcon)`
  margin: 0 auto;
  margin-bottom: 30px;
`