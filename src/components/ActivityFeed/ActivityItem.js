import React from 'react';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { graphql } from 'gatsby';
import { faGithub, faFontAwesomeFlag } from '@fortawesome/free-brands-svg-icons';
import { faFlag, faBriefcase, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, render, cancel, register } from 'timeago.js';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  inline: {
    display: 'inline'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  date: {
    fontSize: 12,
    display: 'inline'
  },
  icon: {
    fontSize: 22,
    color: theme.palette.primary.main
  }
});

const ActivityItem = props => {
  const { classes, item } = props;
  const {
    frontmatter: { title, date, type, category, description }
  } = item;

  console.log(category);
  const iconSelect = {
    milestone: faFontAwesomeFlag,
    career: faBriefcase,
    blog: faFeatherAlt
  };

  return (
    <ListItem>
      <Box mr={2}>
        <FontAwesomeIcon icon={iconSelect[type]} className={classes.icon} />
      </Box>
      <ListItemText
        primary={
          <div className={classes.title}>
            <Typography variant="body2" color="textSecondary">
              {category}
            </Typography>
            <Typography variant="body2" className={classes.date} color="textSecondary">
              {format(date)}
            </Typography>
          </div>
        }
        primaryTypographyProps={{ variant: 'body2' }}
        secondary={
          <React.Fragment>
            {title}
            <Button variant="text" size="small" color="secondary">
              Tell me more →
            </Button>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default withStyles(styles)(ActivityItem);

export const ActivityItemData = graphql`
  fragment ActivityItemData on MarkdownRemark {
    id
    fields {
      collection
      slug
    }
    frontmatter {
      title
      type
      category
      description
      templateKey
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
