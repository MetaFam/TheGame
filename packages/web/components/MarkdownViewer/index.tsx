import dynamic from 'next/dynamic';


type MarkdownViewerProps = { children?: string | null; color?: string };

const Viewer = dynamic(() => import('./MarkdownViewer'), {
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
