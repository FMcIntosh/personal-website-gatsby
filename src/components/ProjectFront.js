import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { animated as a } from 'react-spring';
import ProjectImage from './ProjectImage';

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

const ProjectFront = ({ classes, opacity, transform, title, image }) => {
  return (
    <a.div style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
      <Card className={classes.card}>
        <CardActionArea>
          <ProjectImage imageInfo={image} />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Tell me more →
          </Button>
        </CardActions>
      </Card>
    </a.div>
  );
};

ProjectFront.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectFront);
