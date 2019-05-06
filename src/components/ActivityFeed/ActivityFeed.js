import React from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ActivityItem from './ActivityItem';
import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  layout: {
    position: 'relative',
    width: 'auto',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  container: {
    padding: theme.spacing(3)
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  sectionTitle: {
    fontSize: 22,
    marginTop: theme.spacing(2),
    marginBottom: 0
  },
  card: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 10
  }
});

const ActivityFeed = props => {
  const { classes, activityItems } = props;
  return (
    <div className={classes.layout}>
      <Paper elevation={0} className={classes.card}>
        <Typography variant="h2" gutterBottom className={classes.sectionTitle} align="center">
          Latest Activity
        </Typography>
        <List>
          <div className={classes.container}>
            {activityItems.map(({ node: item }, index) => (
              <>
                {index !== 0 && <Divider key={item.id + 'divider'} style={{ margin: '0 16px' }} />}
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
