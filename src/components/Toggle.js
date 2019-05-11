import React, { useContext } from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import { DayNightContext } from '../../DayNightContex';
import Box from '@material-ui/core/Box';

const styles = {
  switchBase: {
    height: 20
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    boxShadow:
      '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    background: 'white',
    color: 'rgba(210, 54, 105, 1)'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toggle: {
    p: {
      marginTop: '-10px'
    }
  }
};

const Toggle = ({ classes, handleChange, checked }) => {
  const darkMode = useContext(DayNightContext);

  return (
    <div className={classes.container}>
      <Switch
        // classes={{ root: classes.switchBase, switchBase: classes.switchBase }}
        className={classes.toggle}
        checked={darkMode.value}
        onChange={darkMode.toggle}
        value="toggle"
        color="secondary"
        // icon={
        //   <div className={classes.icon}>
        //     <FontAwesomeIcon icon={faSun} size="xs" />
        //   </div>
        // }
        // checkedIcon={
        //   <div className={classes.icon}>
        //     <FontAwesomeIcon icon={faMoon} size="xs" />
        //   </div>
        // }
      />
      <Box mt={-1} fontSize={14}>
        <Typography variant="body1">{darkMode.value ? 'Dusk' : ' Dawn'}</Typography>
      </Box>
    </div>
  );
};

export default withStyles(styles)(Toggle);
