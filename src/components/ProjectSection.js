import React from 'react';
import styled from 'styled-components';
import Project from './Project/Project';
import Grid from '@material-ui/core/Grid';

const ProjectSection = ({ projects }) => {
  return (
    <Grid container spacing={40}>
      {projects.map(({ node: project }) => (
        <Grid item key={project.id} xs={12}>
          <Project key={project.id} project={project} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectSection;
