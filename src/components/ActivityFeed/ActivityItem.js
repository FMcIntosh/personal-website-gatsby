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
    frontmatter: { title, date, type, description }
  } = item;

  const iconSelect = {
    milestone: faFontAwesomeFlag,
    career: faBriefcase,
    blog: faFeatherAlt
  };

  return (
    <ListItem>
      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}

      <FontAwesomeIcon icon={iconSelect[type]} className={classes.icon} />
      <ListItemText
        primary={
          <div className={classes.title}>
            <Typography variant="body2" color="textSecondary">
              Open-source
            </Typography>
            <Typography variant="body2" className={classes.date} color="textSecondary">
              {format(date)}
            </Typography>
          </div>
        }
        primaryTypographyProps={{ variant: 'body2' }}
        secondary={
          <React.Fragment>
            {/* <Typography component="span" className={classes.inline} color="textPrimary">
              Ali Connors
            </Typography> */}
            {description}
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
      description
      templateKey
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
