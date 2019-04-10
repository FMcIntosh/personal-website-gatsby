import React from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ActivityItem from './ActivityItem';
import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  layout: {
    position: 'relative',
    width: 'auto',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  container: {
    padding: theme.spacing.unit * 3
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
});

const ActivityFeed = props => {
  const { classes, activityItems } = props;
  return (
    <div className={classes.layout}>
      <Paper elevation={1}>
        <List>
          <div className={classes.container}>
            {activityItems.map(({ node: item }, index) => (
              <>
                {index !== 0 && <Divider style={{ margin: '0 16px' }} />}
                <ActivityItem key={item.id} item={item} />
              </>
            ))}
          </div>
        </List>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ActivityFeed);
