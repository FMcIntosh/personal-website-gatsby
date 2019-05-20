import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ActivityFeed from '../components/ActivityFeed/ActivityFeed';
import BlogSection from '../components/BlogSection';
import GatsbyLink from '../components/GatsbyLink';
import Layout from '../components/Layout';
import ProjectSection from '../components/ProjectSection';
import Box from '@material-ui/core/Box';
import NavBar from '../components/NavBar';
import Toggle from '../components/Toggle';

const styles = theme => ({
  section: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
    width: '100%',
    minHeight: '100vh',

    //  background:'linear-gradient(180deg, rgba(46,33,77,1) 31%, rgba(144,102,115,1) 81%, rgba(248,137,13,1) 100%)'
    background: theme.palette.background.splash
  },
  titleSection: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
    width: '100%',
    height: '80vh',

    //  background:'linear-gradient(180deg, rgba(46,33,77,1) 31%, rgba(144,102,115,1) 81%, rgba(248,137,13,1) 100%)'
    background: theme.palette.background.splash
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3)
    },
    [theme.breakpoints.up(900 + theme.spacing(3 * 2))]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  footer: {
    // backgroundColor: theme.palette.primary.dark,
    padding: `${theme.spacing(6)}px 0`,
    color: theme.palette.background.plain
  },
  avatar: {
    margin: theme.spacing(2),
    width: 80,
    height: 80
  },
  sectionTitle: {
    fontSize: 26,
    marginBottom: theme.spacing(3)
  },
  plainSectionTitle: {
    fontSize: 26,
    marginBottom: theme.spacing(3)
  },
  title: {
    fontWeight: 800,
    fontSize: '28pt',
    padding: '0 40px'
  },
  sectionAction: {
    marginTop: theme.spacing(4)
  },
  iconButton: {
    width: 48
  }
});

const IndexPage = props => {
  const { data, classes } = props;
  const { edges: projects } = data.projects;
  const { edges: activity } = data.activity;
  const { edges: blogPosts } = data.blogPosts;

  return (
    <>
      <section className={classes.section}>
        <div className={classes.layout}>
          <Box m={1} position="relative" width="100%">
            <Typography variant="h2" component="h1" align="center" className={classes.title}>
              Fraser McIntosh
            </Typography>
            <Box position="absolute" top={0} right={0}>
              <Toggle />
            </Box>
          </Box>
          <Box mt={3} mb={10}>
            <Typography variant="subtitle1" align="center" color="textSecondary">
              {"I'm a web developer living in Auckland, New Zealand. Thanks for stopping by!"}
            </Typography>
          </Box>
        </div>
        <div className={classes.layout}>
          {/* <Typography variant="h2" gutterBottom className={classes.plainSectionTitle}>
            Recent Projects
          </Typography> */}
          <ProjectSection projects={projects} />
          {/* <GatsbyLink to="/projects">
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.sectionAction}
            >
              Projects
            </Button>
          </GatsbyLink> */}
        </div>
        <footer className={classes.footer}>
          <div className={classes.layout}>
            <div>
              <IconButton className={classes.iconButton}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </IconButton>

              <IconButton>
                <FontAwesomeIcon icon={faGithub} />
              </IconButton>
            </div>
          </div>
        </footer>
      </section>
    </>
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
