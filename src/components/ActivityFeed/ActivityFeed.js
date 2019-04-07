import React from 'react';
import Paper from '@material-ui/core';
import ActivityItem from './ActivityItem';

const ActivityFeed = props => {
  const { activityItems } = props;
  return (
    <Paper>
      {activityItems.map(item => {
        <ActivityItem />;
      })}
    </Paper>
  );
};

export default ActivityFeed;
