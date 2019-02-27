import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ProjectSection from '../components/ProjectSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import Toggle from '../components/Toggle';
import IconButton from '@material-ui/core/IconButton';
import useDarkMode from 'use-dark-mode';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => (props.dark ? '#343434' : '')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat';
`;

const PagePadding = styled.div`
  position: relative;
  width: 100%;
  margin: 0 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PageTitle = styled.h1`
  font-size: 28pt;
  font-weight: 800;
`;

const SectionTitle = styled.h2`
  font-size: 20pt;
`;

const TitleSection = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IndexPage = props => {
  const { data } = props;
  const { edges: projects } = data.projects;
  const darkMode = useDarkMode(false);

  return (
    <Layout>
      <PageContainer dark={darkMode.value}>
        <PagePadding>
          <TitleSection>
            <PageTitle>Fraser McIntosh</PageTitle>
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

          <SectionTitle>Latest Projects</SectionTitle>
          <ProjectSection projects={projects} />
        </PagePadding>
      </PageContainer>
    </Layout>
  );
};

export default IndexPage;

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
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
