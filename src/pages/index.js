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

const styles = theme => ({
  section: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
    width: '100%',

    //  background:'linear-gradient(180deg, rgba(46,33,77,1) 31%, rgba(144,102,115,1) 81%, rgba(248,137,13,1) 100%)'
    background: 'linear-gradient(180deg, rgba(46,33,77,1) 6%, rgba(102,73,98,1) 100%);'
  },
  styleSection: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
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
    backgroundColor: theme.palette.background.secondaryAccent,
    padding: `${theme.spacing(6)}px 0`
  },
  avatar: {
    margin: theme.spacing(2),
    width: 80,
    height: 80
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: theme.spacing(3)
  },
  title: {
    fontWeight: 800,
    fontSize: '28pt',
    padding: '0 40px'
  },
  sectionAction: {
    marginTop: theme.spacing(4)
  }
});

const IndexPage = props => {
  const { data, classes } = props;
  const { edges: projects } = data.projects;
  const { edges: activity } = data.activity;
  const { edges: blogPosts } = data.blogPosts;

  return (
    <div>
      <section className={classes.section}>
        <div className={classes.layout}>
          <Box m={1}>
            <Typography variant="h2" component="h1" align="center" className={classes.title}>
              Fraser McIntosh
            </Typography>
          </Box>
          <Box m={3}>
            <Typography variant="subtitle1" align="center" color="textSecondary">
              {"I'm a web developer living in Auckland, New Zealand. Thanks for stopping by!"}
            </Typography>
          </Box>
          {/* <Avatar className={classes.avatar}>
          <ProjectImage imageInfo={projects[0].node.frontmatter.image} />
        </Avatar> */}
          <Box m={4}>
            <ActivityFeed activityItems={activity} />
          </Box>
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
    </div>
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
