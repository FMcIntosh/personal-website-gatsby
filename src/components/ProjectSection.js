import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Project from '../components/Project';
import { render } from 'react-dom';
import { useTransition, animated as a, config } from 'react-spring';
import shuffle from 'lodash/shuffle';
import useMeasure from '../hooks/useMeasure';
import useMedia from '../hooks/useMedia';

const styles = {};

// #root {
//   overflow: auto;
//   display: flex;
//   justify-content: center;
//   background: #f0f0f0;
//   padding: 15px;
// }

const Container = styled.div`
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica,
    ubuntu, roboto, noto, segoe ui, arial, sans-serif;
  width: 100%;
  height: 100%;
`;

const AnimatedCard = styled(a.div)`
  position: absolute;
  will-change: transform, width, height, opacity;
  padding: 15px;
`;

const StyledCard = styled(a.div)`
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

const ProjectSection = props => {
  const { classes, projects } = props;
  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [5, 4, 3],
    2
  );
  const [bind, { width }] = useMeasure();

  const cardHeights = [300, 350, 400, 450];
  const data = projects.map(({ node: post }) => ({
    css: `url(${post.frontmatter.image.childImageSharp.fluid.src})`,
    post,
    key: post.frontmatter.title,
    height: _.sample(cardHeights)
  }));

  const [items, setItems] = useState(data);
  useEffect(() => void setInterval(() => setItems(shuffle), 2000), []);

  let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
  let gridItems = items.map((child, i) => {
    const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy = [
      (width / columns) * column,
      (heights[column] += child.height / 2) - child.height / 2
    ]; // X = container width / number of columns * column index, Y = it's just the height of the current column
    return { ...child, xy, width: width / columns, height: child.height / 2 };
  });

  // This turns gridItems into transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, item => item.css, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25
  });

  console.log(transitions);

  return (
    <Container {...bind} className="list" style={{ height: Math.max(...heights) }}>
      {transitions.map(({ item, props: { xy, ...rest }, key }) => (
        <AnimatedCard
          key={item.key}
          style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`), ...rest }}
        >
          <StyledCard style={{ backgroundImage: item.css }}>
            {/* <Project key={item.id} post={item.post} /> */}
          </StyledCard>
        </AnimatedCard>
      ))}
    </Container>
  );
};

ProjectSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectSection);
