import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Project from './Project/Project';

const styles = theme => ({
  layout: {
    position: 'relative',
    width: 'auto',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(500 + theme.spacing(3 * 2))]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
});

const ProjectSection = ({ classes, projects }) => {
  return (
    <div className={classes.layout}>
      <Grid container spacing={4}>
        {projects.map(({ node: project }) => (
          <Grid item key={project.id} xs={12} sm={12}>
            <Project key={project.id} project={project} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ProjectSection);
