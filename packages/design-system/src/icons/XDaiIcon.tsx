import { createIcon, Icon } from '@chakra-ui/icons';
import * as React from 'react';

export const XDaiIcon: typeof Icon = createIcon({
  displayName: 'xDai',
  path: (
    <g>
      <path
        d="m128 0c70.6 0 128 57.3 128 127.9s-57.4 127.9-128 127.9-128-57.3-128-127.9 57.4-127.9 128-127.9z"
        fill="#48a9a6"
      />
      <g fill="#fff">
        <path d="m62.3 88.6h52.6v-26.3h-52.6z" />
        <path d="m141.1 88.6h52.6v-26.3h-52.6z" />
        <path d="m193.7 141.1h-26.3v26.3h-26.3v26.3h52.6z" />
        <path d="m114.9 193.7v-26.3h-26.3v-26.3h-26.3v52.6z" />
      </g>
    </g>
  ),
  viewBox: '0 0 256 256',
});
