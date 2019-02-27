import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Project from '../components/Project';
import { useTransition, animated as a, config } from 'react-spring';
import shuffle from 'lodash/shuffle';
import useMeasure from '../hooks/useMeasure';
import useMedia from '../hooks/useMedia';

const useMasonary = data => {
  const columns =
    typeof window !== `undefined`
      ? useMedia(
          ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)', '(min-width: 500)'],
          [3, 3, 3, 1],
          1
        )
      : 2;
  const [bind, { width }] = useMeasure();
  const [items, setItems] = useState(data);
  useEffect(() => void setInterval(() => setItems(shuffle), 10000), []);

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
  const transitions = useTransition(gridItems, item => item.key, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25
  });

  return { transitions, bind, height: Math.max(...heights) };
};

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

const ProjectSection = props => {
  const { classes, projects } = props;
  const cardHeights = [325, 350, 327, 400, 425, 450];
  const data = projects.map(({ node: post }) => ({
    post,
    key: post.id,
    height: _.sample(cardHeights)
  }));

  const { transitions, bind, height } = useMasonary(data);

  return (
    <Container {...bind} className="list" style={{ height }}>
      {transitions.map(({ item, props: { xy, ...rest } }) => (
        <AnimatedCard
          key={item.key}
          style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`), ...rest }}
        >
          <Project project={item.post} />
        </AnimatedCard>
      ))}
    </Container>
  );
};

ProjectSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectSection);
