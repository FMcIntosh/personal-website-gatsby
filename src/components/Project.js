import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSpring } from 'react-spring';
import ProjectBack from './ProjectBack';
import ProjectFront from './ProjectFront';

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

const Project = props => {
  const { classes, post, imageURL } = props;
  // const {
  //   excerpt,
  //   frontmatter: { title, image }
  // } = post;
  const [isFlipped, setIsFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  console.log(imageURL);
  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      onClick={() => setIsFlipped(isFlipped => !isFlipped)}
    >
      <StyledCard style={{ backgroundImage: imageURL }} transform={transform} opacity={opacity} />
      {/* <ProjectFront title={title} image={image} transform={transform} opacity={opacity} />
      <ProjectBack title={title} excerpt={excerpt} transform={transform} opacity={opacity} /> */}
    </div>
  );
};

Project.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Project);
