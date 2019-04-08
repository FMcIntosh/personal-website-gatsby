import React from 'react';
import Paper from '@material-ui/core/Paper';
import ActivityItem from './ActivityItem';

const ActivityFeed = props => {
  const { activityItems } = props;
  console.log(
    activityItems.map(({ node: item }) => {
      <ActivityItem item={item} />;
    })
  );
  return (
    <Paper style={{ width: '100%', height: 500 }}>
      {activityItems.map(({ node: item }) => (
        <ActivityItem key={item.id} item={item} />
      ))}
    </Paper>
  );
};

export default ActivityFeed;
