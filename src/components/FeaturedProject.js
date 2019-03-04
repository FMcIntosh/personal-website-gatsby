import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProjectImage from './ProjectImage';
import ProjectModal from './ProjectModal';
import TagSection from './TagSection';

const styles = {
  card: {
    width: '50%',
    // maxWidth: 354,
    // width: 600
    // maxWidth: 345
    marginBottom: 30
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

const Title = styled.h2`
  margin: 0;
`;

const Container = styled.div`
  /* padding: 40px; */
`;

const Project = props => {
  console.log(props);
  const { classes, project, fullScreen = false } = props;
  const {
    excerpt,
    frontmatter: { title, image, tags }
  } = project;

  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Card key={project.id} className={classes.card} onClick={handleClickOpen}>
        <Container>
          <CardActionArea>
            <ProjectImage imageInfo={image} />
          </CardActionArea>

          <CardContent className={classes.content} style={{ display: 'flex' }}>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <TagSection tags={tags} />
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Tell me more →
            </Button>
          </CardActions>
        </Container>
      </Card>

      <ProjectModal
        title={title}
        image={image}
        excerpt={excerpt}
        open={open}
        handleClose={handleClose}
        tags={tags}
      />
    </>
  );
};

export default withStyles(styles)(Project);
