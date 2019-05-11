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
    [theme.breakpoints.up(700 + theme.spacing(3 * 2))]: {
      width: 700,
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
    fontSize: '28pt'
  },
  sectionAction: {
    marginTop: theme.spacing(4)
  }
});

const ProjectPage = props => {
  const { data, classes } = props;
  const { markdownRemark: project } = data;
  const {
    excerpt,
    fields: { slug },
    frontmatter: { title, image, tags, demo, repo, featured, description }
  } = project;

  const darkMode = useContext(DayNightContext);

  return (
    <>
      <section className={classes.section}>
        <div className={classes.layout}>
          <Box mb={2}>
            <Typography variant="h2" component="h1" align="center" className={classes.title}>
              {title}
            </Typography>
          </Box>
          <Toggle checked={darkMode.value} handleChange={darkMode.toggle} />
          <Box mb={6}>
            <Typography variant="subtitle1" align="center" color="textSecondary">
              {description}
            </Typography>
          </Box>

          <Box mb={6} width={'80%'}>
            <ProjectImage imageInfo={image} />
          </Box>

          <Typography variant="subtitle1" align="left" color="textSecondary">
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
    </>
  );
};

export default withStyles(styles)(ProjectPage);

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      ...ProjectInfo
    }
  }
`;
