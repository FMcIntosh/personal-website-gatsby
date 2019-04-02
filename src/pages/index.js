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

const styles = theme => ({
  layout: {
    position: 'relative',
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
});

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => (props.dark ? '#343434' : '')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat';
`;

const TitleSection = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LinkSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IndexPage = props => {
  const { data, classes } = props;
  const { edges: projects } = data.projects;
  const darkMode = useContext(DayNightContext);
  console.log(darkMode);
  console.log(props);

  return (
    <Layout>
      <PageContainer dark={darkMode.value}>
        <div className={classes.layout}>
          <TitleSection>
            <Typography variant="h2" component="h1" style={{ fontWeight: 800, fontSize: '28pt' }}>
              Fraser McIntosh
            </Typography>
            <Toggle checked={darkMode.value} handleChange={darkMode.toggle} />
          </TitleSection>
          <LinkSection>
            <IconButton color="primary">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </IconButton>

            <IconButton>
              <FontAwesomeIcon icon={faGithub} />
            </IconButton>
          </LinkSection>

          <Section>
            <Typography variant="h2" gutterBottom style={{ fontSize: '20pt' }}>
              Recent Projects
            </Typography>
            <ProjectSection projects={projects} />
          </Section>
        </div>
      </PageContainer>
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
  }
`;
