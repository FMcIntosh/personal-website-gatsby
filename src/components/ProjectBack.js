import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { animated as a } from 'react-spring';

const styles = {
  card: {
    width: '100%',
    maxWidth: 354,
    width: 300,
    height: 300
    // maxWidth: 345
  },
  media: {
    height: 140
  },
  content: {
    position: 'relative'
    // background: '#34343488'
  },
  cardBack: {
    position: 'absolute',
    top: 0
  }
};

const ProjectBack = ({ classes, opacity, transform, title, excerpt }) => {
  return (
    <a.div
      style={{
        opacity,
        transform: transform.interpolate(t => `${t} rotateX(180deg)`),
        position: 'absolute',
        top: 0
      }}
    >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography component="p">{excerpt}</Typography>
        </CardContent>
      </Card>
    </a.div>
  );
};

ProjectBack.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectBack);
