import dynamic from 'next/dynamic';
import React from 'react';

type MarkdownViewerProps = { children?: string | null; color?: string };

const Viewer = dynamic(() => import('./MarkdownViewer.js'), {
  ssr: false,
});

export const MarkdownViewer = React.forwardRef<
  HTMLDivElement,
  MarkdownViewerProps
>(({ children, color }, ref) => (
  <div ref={ref}>
    <Viewer color={color}>{children ?? ''}</Viewer>
  </div>
));
