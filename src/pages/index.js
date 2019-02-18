import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ProjectSection from '../components/ProjectSection';
import Toggle from 'react-toggle';
import './toggle.css';

const PageContainer = styled.div`
  width: 100%;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PageTitle = styled.h1`
  font-size: 28pt;
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

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: projects } = data.projects;

    return (
      <Layout>
        <PageContainer>
          <TitleSection>
            <PageTitle>Fraser McIntosh</PageTitle>
            <Toggle />
          </TitleSection>
          <LinkSection>
            <button>L</button>
            <button>G</button>
          </LinkSection>

          <PageTitle>Latest Projects</PageTitle>
          <ProjectSection projects={projects} />
        </PageContainer>
      </Layout>
    );
  }
}

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
