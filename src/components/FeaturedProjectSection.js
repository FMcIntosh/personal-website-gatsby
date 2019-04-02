import React from 'react';
import styled from 'styled-components';
import FeaturedProject from './FeaturedProject';
import Grid from '@material-ui/core/Grid';

const FeaturedProjectSection = ({ projects }) => {
  return (
    <Grid container spacing={40}>
      {projects.map(({ node: project }) => (
        <Grid item key={project.id} xs={12}>
          <FeaturedProject key={project.id} project={project} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedProjectSection;
