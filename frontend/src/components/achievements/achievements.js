import React from 'react';

import 'bulma';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Star from '../../assets/star.png';

import './achievements.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
  },
  heading: {
    color: '#fe346e',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 15,
    flexShrink: 0,
    maxWidth: '100%',
  },
  description: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 13,
  },
}));

const dummy = [
  {
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  },
  {
    title: 'qui est esse',
  },
  {
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
  },
  {
    title: 'eum et est occaecati',
  },
  {
    title: 'nesciunt quas odio',
  },
];

const Achievements = () => {
  const classes = useStyles();
  return (
    <div className="tile is-child box achievements">
      <div className={`${classes.root} achievements-panel`}>
        <p>Honors & Achievemnts</p>
        <br></br>
        {dummy.map((item, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={Star}></Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.title} secondary="20-04-2020" />
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
