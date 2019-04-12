import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';

import BackgroundImage from 'gatsby-background-image';

const BackgroundSection = ({ className, children }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "pattern1.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid;
      console.log(imageData);
      return (
        <div
          style={{
            backgroundImage: `url(${imageData.src})`,
            position: 'relative',
            backgroundSize: 90,
            zIndex: -1
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              opacity: 0.85,
              background: 'white',
              zIndex: -3
            }}
          />
          {children}
        </div>
      );
    }}
  />
);

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
`;

export default StyledBackgroundSection;
