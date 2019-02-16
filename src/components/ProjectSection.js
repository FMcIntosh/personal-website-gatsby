import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Project from '../components/Project';

const styles = {};

const Container = styled.div`
  display: flex;
`;

const ProjectSection = props => {
  const { classes, projects } = props;
  console.log('hi');
  return (
    <Container>
      {projects.map(({ node: post }) => (
        <Project key={post.id} post={post} />
      ))}
    </Container>
  );
};

ProjectSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectSection);
