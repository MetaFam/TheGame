import React from 'react';
import * as ReactDOM from 'react-dom';

import { Fonts } from '../stories/0-Text.stories';

describe('Text Stories', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Fonts />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
