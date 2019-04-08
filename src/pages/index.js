import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
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

const styles = theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.only('xs')]: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2
    },
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`
  },
  avatar: {
    margin: theme.spacing.unit * 2,
    width: 80,
    height: 80
  }
});

const TitleSection = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Section = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IndexPage = props => {
  const { data, classes } = props;
  const { edges: projects } = data.projects;
  const { edges: activity } = data.activity;
  const darkMode = useContext(DayNightContext);
  console.log(activity);

  return (
    <Layout>
      <div className={classes.layout}>
        <TitleSection>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            style={{ fontWeight: 800, fontSize: '28pt', padding: '0 40px' }}
          >
            Fraser McIntosh
          </Typography>
          <Toggle checked={darkMode.value} handleChange={darkMode.toggle} />
        </TitleSection>
        <Typography variant="subtitle1" align="center">
          {"I'm a web developer living in Auckland, New Zealand. Thanks for stopping by!"}
        </Typography>
        {/* <Avatar className={classes.avatar}>
          <ProjectImage imageInfo={projects[0].node.frontmatter.image} />
        </Avatar> */}
        <ActivityFeed activityItems={activity} />
        <Section>
          {/* <Paper style={{ padding: 20 }}> */}
          <Typography variant="h2" gutterBottom style={{ fontSize: '20pt' }}>
            Recent Projects
          </Typography>
          <ProjectSection projects={projects} />
          {/* </Paper> */}
        </Section>
      </div>
      <footer className={classes.footer}>
        <div className={classes.layout}>
          <IconButton>
            <FontAwesomeIcon icon={faLinkedinIn} />
          </IconButton>

          <IconButton>
            <FontAwesomeIcon icon={faGithub} />
          </IconButton>
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
          id
          fields {
            collection
            slug
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
