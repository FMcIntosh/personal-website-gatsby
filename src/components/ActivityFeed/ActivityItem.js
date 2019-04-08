import React from 'react';
import Paper from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const ActivityItem = props => {
  const { item } = props;
  const {
    frontmatter: { title, description }
  } = item;

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <div style={{ display: 'flex', marginBottom: 5 }}>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </div>
        <Typography variant="body1">{description}</Typography>
      </div>
    </div>
  );
};

export default ActivityItem;
