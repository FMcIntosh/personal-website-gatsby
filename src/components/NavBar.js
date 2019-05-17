import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toggle from '../components/Toggle';
import GatsbyLink from '../components/GatsbyLink';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles(theme => ({
  appBar: {
    flexGrow: 1,
    background: theme.palette.background.paper,
    zIndex: 1400
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3)
    },
    [theme.breakpoints.up(1000 + theme.spacing(3 * 2))]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  menuLeft: {},
  menuRight: {
    display: 'flex',
    alignItems: 'center'
  },
  drawerContent: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3)
    }
  },
  drawerClose: {
    alignSelf: 'flex-end'
  },
  drawerNav: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 16
  },
  paper: {
    width: '100%'
  }
}));

function HideOnScroll(props) {
  const { children, forceFlat } = props;
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });
  return React.cloneElement(children, {
    elevation: trigger && !forceFlat ? 4 : 0
  });

  //   <Slide appear={false} direction="down" in={!trigger}>
  //   {children}
  // </Slide>
}
// rgba(46,33,77,1)
const NavBar = props => {
  const classes = useStyles();
  const [isMenuOpen, setMenuIsOpen] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });
  const fade = useSpring({ opacity: trigger ? 1 : 0 });
  return (
    <>
      <HideOnScroll forceFlat={isMenuOpen}>
        <AppBar className={classes.appBar}>
          <Toolbar variant="dense" className={classes.toolbar}>
            <animated.div style={fade}>
              <GatsbyLink to="/">
                <Typography variant="h6">Fraser McIntosh</Typography>
              </GatsbyLink>
            </animated.div>
            <Hidden smDown>
              <div className={classes.menuRight}>
                <GatsbyLink to="/projects">
                  <Button variant="text" color="primary">
                    Projects
                  </Button>
                </GatsbyLink>
                <GatsbyLink to="/blog">
                  <Button variant="text" color="primary">
                    Blog
                  </Button>
                </GatsbyLink>
                <Toggle />
              </div>
            </Hidden>
            <Hidden mdUp>
              <Button variant="text" onClick={() => setMenuIsOpen(state => !state)}>
                {isMenuOpen ? 'Close Menu' : 'Menu'}
              </Button>
            </Hidden>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Drawer
        anchor="right"
        open={isMenuOpen}
        className={classes.drawer}
        classes={{
          paper: classes.paper
        }}
      >
        <div className={classes.drawerContent}>
          <Button
            className={classes.drawerClose}
            variant="text"
            onClick={() => setMenuIsOpen(false)}
          >
            Close Menu
          </Button>
          <Box mt={3} className={classes.drawerNav}>
            <Toggle />
            <Box mt={5} display="flex" flexDirection="column" alignItems="center" fontSize={20}>
              <GatsbyLink to="/projects">
                <Button variant="text" onClick={() => setMenuIsOpen(state => !state)}>
                  Projects
                </Button>
              </GatsbyLink>
              <GatsbyLink to="/blog">
                <Button variant="text" onClick={() => setMenuIsOpen(state => !state)}>
                  Blog
                </Button>
              </GatsbyLink>
            </Box>
            {/* {sideList('right')} */}
          </Box>
        </div>
      </Drawer>
    </>
  );
};

export default NavBar;
