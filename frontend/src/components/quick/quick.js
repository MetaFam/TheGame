import React from 'react';

import 'bulma';

import './quick.css';

import PushPin from '../../assets/pushpin.png';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class Quick extends React.Component {
  render() {
    return (
      <div className="tile is-child box quick">
        <span className="tag is-light">
          <img src={PushPin} alt="" />
          <button className="delete is-small"></button>
        </span>
        <span className="tag is-light">
          <img src={PushPin} alt="" />
          <button className="delete is-small"></button>
        </span>
        <span className="tag is-light">
          <img src={PushPin} alt="" />
          <button className="delete is-small"></button>
        </span>
        <span className="tag is-light">
          <img src={PushPin} alt="" />
          <button className="delete is-small"></button>
        </span>
        <span className="tag is-light">
          <img src={PushPin} alt="" />
          <button className="delete is-small"></button>
        </span>
        <div id="add">
          <IconButton aria-label="Add">
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default Quick;
