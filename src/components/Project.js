import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSpring } from 'react-spring';
import styled from 'styled-components';
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

const StyledCard = styled.div`
  /* background-image: ${props =>
    `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)), ${props.imageURL}`}; */
    background-image: ${props =>
      `linear-gradient(rgba(210, 54, 105, 1),rgba(210, 54, 105, 1)), ${props.imageURL}`};
  z-index:2;
  :hover {
    cursor: pointer;
  }

  transition: all 0.2s ease;
  position: relative;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 10px;
  border-radius: 4px;
  box-shadow: 0px 10px 50px -10px rgba(0, 0, 0, 0.2);
`;

const StyledTitle = styled.div`
  color: white;
  line-height: 1.8em;
  font-size: 1.5em;
  word-wrap: break-word;
  width: 75%;
  z-index: 1;
`;

const StyledSpan = styled.span`
  padding: 0.2em;
  box-shadow: 0.1em 0 0 rgba(#34ef23, 0.7), -0.1em 0 0 rgba(#34ef23, 0.7);
  /* background-color: #d23669bb; */
  letter-spacing: 5px;
`;
const TitleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Project = props => {
  const { classes, project, imageURL, fullScreen = false } = props;
  const {
    excerpt,
    frontmatter: { title, image }
  } = project;
  const [isFlipped, setIsFlipped] = useState(false);
  const [open, setOpen] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  console.log(imageURL, open);
  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      onClick={() => {
        setIsFlipped(isFlipped => !isFlipped);
      }}
    >
      <StyledCard
        imageURL={imageURL}
        transform={transform}
        opacity={opacity}
        onClick={handleClickOpen}
      >
        <TitleWrapper>
          <StyledTitle>
            <StyledSpan>{title}</StyledSpan>
          </StyledTitle>
        </TitleWrapper>
      </StyledCard>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <ProjectImage imageInfo={image} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <p>{excerpt}</p>
        </CardContent>

        <CardActions>
          <Button size="small" color="primary" onClick={handleClose}>
            Close
          </Button>
        </CardActions>
      </Dialog>
      {/* <ProjectFront title={title} image={image} transform={transform} opacity={opacity} />
      <ProjectBack title={title} excerpt={excerpt} transform={transform} opacity={opacity} /> */}
    </div>
  );
};

Project.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Project);
