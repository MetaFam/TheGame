import dynamic from 'next/dynamic';
import React from 'react';

type MarkdownViewerProps = { children?: string | null };

const Viewer = dynamic(() => import('./MarkdownViewer'), {
  ssr: false,
});

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ children }) => (
  <Viewer>{children ?? ''}</Viewer>
);
