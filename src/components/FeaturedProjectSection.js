import React from 'react';
import styled from 'styled-components';
import FeaturedProject from './FeaturedProject';

const Container = styled.div`
  position: relative;
  /* font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica,
    ubuntu, roboto, noto, segoe ui, arial, sans-serif; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeaturedProjectSection = ({ projects }) => {
  return (
    <Container>
      {projects.map(({ node: project }) => (
        <FeaturedProject key={project.id} project={project} />
      ))}
    </Container>
  );
};

export default FeaturedProjectSection;
