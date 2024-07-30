import { LoadingState } from '@metafam/ds';
import React, { Suspense, useRef } from 'react';

import useFirstViewportEntry from '#lib/hooks/useFirstViewportEntry';

const RenderOnViewportEntry: React.FC<any> = ({
  children,
  threshold = 0,
  root = null,
  rootMargin = '0px 0px 0px 0px',
  ...wrapperDivProps
}) => {
  const ref = useRef<HTMLDivElement>();
  const entered = useFirstViewportEntry(ref, { threshold, root, rootMargin });

  return (
    <div {...wrapperDivProps} ref={ref} style={{ width: '100%' }}>
      {entered && <Suspense fallback={<LoadingState />}>4{children}</Suspense>}
    </div>
  );
};

export default RenderOnViewportEntry;
