import { Typography, Button } from '@material-ui/core';
import { graphql } from 'gatsby';
import React, { useContext } from 'react';
import ActivityFeed from '../components/ActivityFeed/ActivityFeed';
import Layout from '../components/Layout';
import P from '../components/Project/Project';
import Toggle from '../components/Toggle';
import ProjectImage from '../components/Project/ProjectImage';
import { withStyles } from '@material-ui/core/styles';
import { DayNightContext } from '../../DayNightContex';
import GatsbyLink from '../components/GatsbyLink';

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
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
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
  title: {
    fontWeight: 800,
    fontSize: '28pt',
    padding: '0 40px'
  },
  subtitle: { marginBottom: theme.spacing.unit * 3 },
  sectionAction: {
    marginTop: theme.spacing.unit * 4
  },
  cardMedia: {
    width: '80%'
  }
});

const ProjectPage = props => {
  const { data, classes } = props;
  const { markdownRemark: project } = data;
  const {
    excerpt,
    fields: { slug },
    frontmatter: { title, tags, demo, repo, featured, description }
  } = project;

  const darkMode = useContext(DayNightContext);

  return (
    <Layout>
      <section className={classes.section}>
        <div className={classes.layout}>
          <Typography variant="h2" component="h1" align="center" className={classes.title}>
            {title}
          </Typography>
          <Toggle checked={darkMode.value} handleChange={darkMode.toggle} />
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            className={classes.subtitle}
          >
            {description}
          </Typography>
          {/* <div className={classes.cardMedia}>
            <ProjectImage imageInfo={image} />
          </div> */}

          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            className={classes.subtitle}
          >
            {excerpt}
          </Typography>
          <GatsbyLink to="/projects">
            <Button variant="text" size="small" color="primary" className={classes.sectionAction}>
              Back to projects
            </Button>
          </GatsbyLink>
        </div>

        {/* {(
          <Helmet titleTemplate="%s | Project">
            <title>{`${project.frontmatter.title}`}</title>
            <meta name="description" content={`${project.frontmatter.description}`} />
          </Helmet>
        ) || ''} */}
      </section>
    </Layout>
  );
};

export default withStyles(styles)(ProjectPage);

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      ...BlogPostInfo
    }
  }
`;
