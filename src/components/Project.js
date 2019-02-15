import React from 'react';
import { Link, graphql } from 'gatsby';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

{
  /* <p>

<span> &bull; </span>
<small>{post.frontmatter.date}</small>
</p>
<p>
{post.excerpt}
<br />
<br />
<Button variant="contained" color="primary">
  <Link to={post.fields.slug}>Keep Reading →</Link>
</Button>
</p> */
}

const MediaCard = props => {
  const { classes, post } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://jpsportsbook.com/wp-content/uploads/2018/10/Team.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Link to={post.fields.slug}>
            <Typography gutterBottom variant="h5" component="h2">
              {post.frontmatter.title}
            </Typography>
          </Link>
          <Typography component="p">{post.excerpt}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={post.fields.slug}>Keep Reading →</Link>
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
