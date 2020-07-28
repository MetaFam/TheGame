import React from 'react';
import * as ReactDOM from 'react-dom';

import { Sizes } from './0-Text.stories';

describe('Text Stories', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sizes />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
