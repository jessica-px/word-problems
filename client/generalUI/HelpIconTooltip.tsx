import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import { withStyles, Theme } from '@material-ui/core/styles';

interface HelpIconTooltipProps {
  tooltip: string
}

export const HelpIconTooltip = ({tooltip}: HelpIconTooltipProps) => (
  <StyledTooltip title={tooltip} arrow placement="top">
    <HelpIcon style={{ fontSize: 16 }}/>
  </StyledTooltip>
)

const StyledTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 2
  },
}))(Tooltip);