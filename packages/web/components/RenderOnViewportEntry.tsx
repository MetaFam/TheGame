import { LoadingState } from '@metafam/ds';
import useFirstViewportEntry from 'lib/hooks/useFirstViewportEntry';
import React, { Suspense, useRef } from 'react';

const RenderOnViewportEntry: React.FC<any> = ({ children, threshold = 0, root = null, rootMargin = "0px 0px 0px 0px", ...wrapperDivProps }) => {
  const ref = useRef()
  const entered = useFirstViewportEntry(ref, { threshold, root, rootMargin, });

  return (
    <div {...wrapperDivProps} ref={ref}>
      {entered && <Suspense fallback={<LoadingState />}>{children}</Suspense>}
    </div>
  );
};

export default RenderOnViewportEntry;
