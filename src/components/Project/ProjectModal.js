import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ProjectImage from './ProjectImage';
import { withStyles } from '@material-ui/core/styles';
import TagSection from './TagSection';

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

const ProjectModal = props => {
  const { classes, image, title, excerpt, open, handleClose, tags } = props;

  return (
    <Dialog
      fullScreen={false}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <ProjectImage imageInfo={image} />
      <CardContent>
        <div style={{ display: 'flex' }}>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <TagSection tags={tags} />
        </div>
        <p>{excerpt}</p>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={handleClose}>
          Close
        </Button>
      </CardActions>
    </Dialog>
  );
};

export default withStyles(styles)(ProjectModal);
