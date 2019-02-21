import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  toggle: {
    position: 'absolute',
    right: '0'
  }
};

const Toggle = ({ classes, handleChange, checked }) => {
  return (
    <Switch className={classes.toggle} checked={checked} onChange={handleChange} value="toggle" />
  );
};

export default withStyles(styles)(Toggle);
