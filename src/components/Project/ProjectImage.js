import React from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';

const ProjectImage = props => {
  const { imageInfo, style } = props;
  const imageStyle = {
    borderRadius: '0',
    // position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    ...style
  };
  const { alt = '', childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return <GatsbyImage style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />;
  }

  if (!!childImageSharp) {
    return <GatsbyImage style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />;
  }

  if (!!image && typeof image === 'string') {
    return <GatsbyImage style={imageStyle} src={image} alt={alt} />;
  }

  return null;
};

ProjectImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object
  }).isRequired
};

export default ProjectImage;
