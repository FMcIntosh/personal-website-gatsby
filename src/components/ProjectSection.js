import React from 'react';
import styled from 'styled-components';
import Project from './Project/Project';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/button';

const styles = theme => ({
  layout: {
    position: 'relative',
    width: 'auto',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
});

const ProjectSection = ({ classes, projects }) => {
  return (
    <div className={classes.layout}>
      <Grid container spacing={24}>
        {projects.map(({ node: project }) => (
          <Grid item key={project.id} xs={12}>
            <Project key={project.id} project={project} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ProjectSection);
