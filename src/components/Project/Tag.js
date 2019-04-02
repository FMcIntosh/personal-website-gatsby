import React from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    marginLeft: 4,
    height: 'fit-content'
  }
});

const Tag = props => {
  const { classes, label, background, color } = props;
  return <Chip label={label} className={classes.chip} style={{ background, color }} />;
};

export default withStyles(styles)(Tag);
