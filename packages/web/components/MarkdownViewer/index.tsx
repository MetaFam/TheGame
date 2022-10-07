import dynamic from 'next/dynamic';

type MarkdownViewerProps = { children?: string | null };

const Viewer = dynamic(() => import('./MarkdownViewer'), {
  ssr: false,
});

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ children }) => (
  <Viewer>{children ?? ''}</Viewer>
);
