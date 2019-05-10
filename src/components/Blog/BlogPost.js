import React, { useState } from 'react';
import { graphql } from 'gatsby';
import GatsbyLink from '../GatsbyLink';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  media: {
    height: 140
  },
  content: {
    position: 'relative'
    // background: '#34343488'
  },
  link: {
    textDecoration: 'underline',
    margin: theme.spacing(1)
  },
  actions: {
    justifyContent: 'space-between'
  },
  cardMedia: {
    width: 160
  }
});

const Project = props => {
  const { classes, blogPost, fullScreen = false } = props;
  const {
    excerpt,
    fields: { slug },
    frontmatter: { title, image, tags, demo, repo, featured, description }
  } = blogPost;

  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div key={blogPost.id} className={classes.card} onClick={handleClickOpen} elevation={0}>
      <div className={classes.cardDetails}>
        <CardContent className={classes.content}>
          <div style={{ display: 'flex' }}>
            <div>
              <div style={{ display: 'flex', marginBottom: 5 }}>
                <Typography variant="h5" component="h2">
                  {title}
                </Typography>
              </div>
              <Typography variant="body1">{description}</Typography>
            </div>
            {/* Circle image on the right, parent div needs jc: space-between */}
            {/* <Hidden xsDown>
                <div
                  style={{
                    justifySelf: 'flex-end'
                  }}
                >
                  <Avatar style={{ width: 80, height: 80 }}>
                    <ProjectImage imageInfo={image} />
                  </Avatar>
                </div>
              </Hidden> */}
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button variant="outlined" size="small" color="secondary">
            <GatsbyLink to={slug}>Tell me more →</GatsbyLink>
          </Button>
          <Typography>
            {repo && (
              <MuiLink className={classes.link} href={repo} onClick={e => e.stopPropagation()}>
                Repo
              </MuiLink>
            )}
            {demo && (
              <MuiLink className={classes.link} href={demo} onClick={e => e.stopPropagation()}>
                Demo
              </MuiLink>
            )}
          </Typography>
        </CardActions>
      </div>
      {/* Image taking full height on the right */}
      {/* <Hidden xsDown>
          <ProjectImage imageInfo={image} style={{ width: 160, height: 'auto' }} />
        </Hidden> */}
    </div>
  );
};

export const BlogPostInfo = graphql`
  fragment BlogPostInfo on MarkdownRemark {
    excerpt(pruneLength: 400)
    id
    fields {
      slug
    }
    frontmatter {
      title
      description
      templateKey
      date(formatString: "MMMM DD, YYYY")
      tags
    }
  }
`;
export default withStyles(styles)(Project);
