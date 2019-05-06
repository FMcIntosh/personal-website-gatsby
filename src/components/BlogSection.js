import React from 'react';
import styled from 'styled-components';
import BlogPost from './Blog/BlogPost';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  layout: {
    position: 'relative',
    width: 'auto',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
});

const ProjectSection = ({ classes, blogPosts }) => {
  return (
    <div className={classes.layout}>
      <Grid container spacing={3}>
        {blogPosts.map(({ node: blogPost }) => (
          <Grid item key={blogPost.id} xs={12}>
            <BlogPost key={blogPost.id} blogPost={blogPost} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ProjectSection);
