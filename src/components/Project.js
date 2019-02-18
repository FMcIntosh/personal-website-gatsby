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
  background-image: ${props =>
    `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)), ${props.imageURL}`};
  position: relative;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 10px;
  line-height: 10px;
  border-radius: 4px;
  box-shadow: 0px 10px 50px -10px rgba(0, 0, 0, 0.2);
`;

const StyledTitle = styled.div`
  color: white;
  line-height: 1.8em;
  font-size: 1.7em;
  display: inline;
  word-wrap: break-word;
  /* word-spacing: 100vw; */
  width: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  text-align: center;
`;

const StyledSpan = styled.span`
  padding: 0.2em;
  box-shadow: 0.1em 0 0 rgba(#34ef23, 0.7), -0.1em 0 0 rgba(#34ef23, 0.7);
  background-color: #34343488;
  background-color: rgba(#34ef23, 0.7);
`;
const TitleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
`;

const Project = props => {
  const { classes, project, imageURL } = props;
  const {
    excerpt,
    frontmatter: { title, image }
  } = project;
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
      <StyledCard imageURL={imageURL} transform={transform} opacity={opacity}>
        <TitleWrapper>
          <StyledTitle>
            <StyledSpan>{title}</StyledSpan>
          </StyledTitle>
        </TitleWrapper>
      </StyledCard>
      {/* <ProjectFront title={title} image={image} transform={transform} opacity={opacity} />
      <ProjectBack title={title} excerpt={excerpt} transform={transform} opacity={opacity} /> */}
    </div>
  );
};

Project.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Project);
