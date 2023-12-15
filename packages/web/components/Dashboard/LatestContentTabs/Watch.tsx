import { AspectRatio, Box, LoadingState } from '@metafam/ds';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LIMIT, URL } from 'utils/LatestContentHelpers';

interface Video {
  id: string;
  videoId: string;
  title: string;
}

type FetchResponse = {
  items: GoogleApiYouTubePlaylistItemResource[];
  nextPageToken: string;
  pageInfo?: {
    totalResults: number;
  };
};

export const Watch: React.FC = () => {
  const [videos, setVideos] = useState<Array<Video> | []>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const onScreen = useOnScreen(moreRef);
  const maxPages = useMemo(() => Math.ceil(count / LIMIT) || 0, [count]);

  useEffect(() => {
    const abortController = new AbortController();
    const load = async () => {
      try {
        const res: FetchResponse = await fetch(URL, {
          signal: abortController.signal,
        }).then((r) => r.json());
        const videosList = res.items
          ? res.items.map((video: GoogleApiYouTubePlaylistItemResource) => ({
              id: video.id,
              videoId: video.snippet.resourceId.videoId,
              title: video.snippet.title,
            }))
          : [];
        setNextPageToken(res.nextPageToken);
        setVideos(videosList);
        setCount(res.pageInfo ? res.pageInfo.totalResults : 0);
        setLoading(false);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          throw err;
        }
      }
    };

    load();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading && onScreen && page <= maxPages && nextPageToken) {
      setIsFetchingMore(true);
      const fetchMoreURL = `${URL}&pageToken=${nextPageToken}`;

      fetch(fetchMoreURL)
        .then((r) => r.json())
        .then((res) => {
          const newItems = res.items.map(
            (video: GoogleApiYouTubePlaylistItemResource) => ({
              id: video.id,
              videoId: video.snippet.resourceId.videoId,
              title: video.snippet.title,
            }),
          );

          setVideos((prevVideos) => [...prevVideos, ...newItems]);
          setPage((prevPage) => prevPage + 1);
          setNextPageToken(res.nextPageToken);
        });

      setIsFetchingMore(false);
    }
  }, [loading, maxPages, nextPageToken, onScreen, page]);
  return (
    <Box px={2} pl={0}>
      {loading ? (
        <LoadingState />
      ) : (
        <Box>
          {videos.map((video: Video) => {
            const url = `https://www.youtube.com/embed/${video?.videoId}`;
            return (
              <AspectRatio
                key={video.id}
                ratio={16 / 9}
                borderRadius="md"
                overflow="hidden"
                mt={4}
              >
                <Box
                  as="iframe"
                  title={video?.title}
                  src={url}
                  allowFullScreen
                />
              </AspectRatio>
            );
          })}
        </Box>
      )}
      <span ref={moreRef} />
      {isFetchingMore && <LoadingState />}
    </Box>
  );
};
