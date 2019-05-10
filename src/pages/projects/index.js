import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GatsbyLink from '../../components/GatsbyLink';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { DayNightContext } from '../../../DayNightContex';
import ActivityFeed from '../../components/ActivityFeed/ActivityFeed';
import BlogSection from '../../components/BlogSection';
import Layout from '../../components/Layout';
import ProjectSection from '../../components/ProjectSection';
import Toggle from '../../components/Toggle';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  section: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
    width: '100%',
    background: theme.palette.background.paper
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
  title: {
    fontWeight: 800,
    fontSize: '28pt',
    padding: '0 40px'
  }
});

const IndexPage = props => {
  const { data, classes } = props;
  const { edges: projects } = data.projects;
  const darkMode = useContext(DayNightContext);

  return (
    <Layout>
      <section className={classes.section}>
        <div className={classes.layout}>
          <Typography variant="h2" component="h1" align="center" className={classes.title}>
            Projects
          </Typography>
          <Toggle checked={darkMode.value} handleChange={darkMode.toggle} />
          <Box mt={4}>
            <ProjectSection projects={projects} />
          </Box>
          <Box mt={4}>
            <Button variant="contained" size="small" color="primary">
              <GatsbyLink to="/">Home</GatsbyLink>
            </Button>
          </Box>
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
  query ProjectQuery {
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
  }
`;
