import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import GatsbyLink from '../components/GatsbyLink';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ProjectSection from '../components/ProjectSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import Toggle from '../components/Toggle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { DayNightContext } from '../../DayNightContex';
import { withStyles } from '@material-ui/core/styles';
import ProjectImage from '../components/Project/ProjectImage';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import ActivityFeed from '../components/ActivityFeed/ActivityFeed';
import BackgroundImage from '../components/BackgroundImage';
import BlogSection from '../components/BlogSection';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  section: {
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 8,
    width: '100%',
    background: theme.palette.background.paper
  },
  styleSection: {
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 8,
    width: '100%',
    background: theme.palette.background.primaryAccent,
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3
    },
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  footer: {
    backgroundColor: theme.palette.background.secondaryAccent,
    padding: `${theme.spacing.unit * 6}px 0`
  },
  avatar: {
    margin: theme.spacing.unit * 2,
    width: 80,
    height: 80
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: theme.spacing.unit * 3
  },
  activityContainer: {
    marginTop: theme.spacing.unit * 4
  },
  title: {
    fontWeight: 800,
    fontSize: '28pt',
    padding: '0 40px'
  },
  subtitle: { margin: theme.spacing.unit * 3 },
  sectionAction: {
    marginTop: theme.spacing.unit * 4
  }
});

const IndexPage = props => {
  const { data, classes } = props;
  const { edges: projects } = data.projects;
  const { edges: activity } = data.activity;
  const { edges: blogPosts } = data.blogPosts;

  const darkMode = useContext(DayNightContext);

  return (
    <Layout>
      <section className={classes.section}>
        <div className={classes.layout}>
          <Typography variant="h2" component="h1" align="center" className={classes.title}>
            Fraser McIntosh
          </Typography>
          <Toggle checked={darkMode.value} handleChange={darkMode.toggle} />
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            className={classes.subtitle}
          >
            {"I'm a web developer living in Auckland, New Zealand. Thanks for stopping by!"}
          </Typography>
          {/* <Avatar className={classes.avatar}>
          <ProjectImage imageInfo={projects[0].node.frontmatter.image} />
        </Avatar> */}
          <div className={classes.activityContainer}>
            <ActivityFeed activityItems={activity} />
          </div>
        </div>
      </section>
      <section className={classes.styleSection}>
        <div className={classes.layout}>
          {/* <Paper style={{ padding: 20 }}> */}
          <Typography variant="h2" gutterBottom className={classes.sectionTitle}>
            Recent Projects
          </Typography>
          <ProjectSection projects={projects} />
          <GatsbyLink to="/projects">
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.sectionAction}
            >
              See more projects
            </Button>
          </GatsbyLink>
          {/* </Paper> */}
        </div>
      </section>
      <section className={classes.section}>
        <div className={classes.layout}>
          {/* <Paper style={{ padding: 20 }}> */}
          <Typography variant="h2" gutterBottom className={classes.sectionTitle}>
            From the blog
          </Typography>
          <BlogSection blogPosts={blogPosts} />
          <GatsbyLink to="/blog">
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.sectionAction}
            >
              All posts
            </Button>
          </GatsbyLink>
          {/* </Paper> */}
        </div>
      </section>
      <footer className={classes.footer}>
        <div className={classes.layout}>
          <div>
            <IconButton>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </IconButton>

            <IconButton>
              <FontAwesomeIcon icon={faGithub} />
            </IconButton>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default withStyles(styles)(IndexPage);

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    projects: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "project" } } }
    ) {
      edges {
        node {
          ...ProjectInfo
        }
      }
    }

    activity: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "activity" } } }
    ) {
      edges {
        node {
          ...ActivityItemData
        }
      }
    }

    blogPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          ...BlogPostInfo
        }
      }
    }
  }
`;
