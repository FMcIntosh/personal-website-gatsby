import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import GatsbyLink from '../../components/GatsbyLink';
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
  const { edges: blogPosts } = data.blogPosts;

  const darkMode = useContext(DayNightContext);

  return (
    <Layout>
      <section className={classes.section}>
        <div className={classes.layout}>
          <Typography variant="h2" component="h1" align="center" className={classes.title}>
            Blog
          </Typography>
          <Toggle checked={darkMode.value} handleChange={darkMode.toggle} />
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            className={classes.subtitle}
          >
            {'This is a blog where blogs are blogged'}
          </Typography>
          <BlogSection blogPosts={blogPosts} />
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.sectionAction}
          >
            <GatsbyLink to="/">Home</GatsbyLink>
          </Button>
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
  query BlogQuery {
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
