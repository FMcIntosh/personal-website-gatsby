import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';

const mapping = {
  react: {
    label: 'React',
    background: '#61dafb',
    color: '#FFF'
  },
  gatsby: {
    label: 'Gatsby',
    background: 'rgb(102, 51, 153)',
    color: '#FFF'
  },
  netlify: {
    label: 'Netlify',
    background: '#00ad9f',
    color: '#FFF'
  }
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 10px;
`;

const TagSection = props => {
  const { tags } = props;
  console.log(tags);
  return (
    <Container>
      {tags.map(tag => {
        if (!mapping[tag]) {
          return null;
        }
        const { label, background, color } = mapping[tag];
        return <Tag key={label} label={label} background={background} color={color} />;
      })}
    </Container>
  );
};

export default TagSection;
