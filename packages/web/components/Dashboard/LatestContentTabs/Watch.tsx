import { AspectRatio, Box, LoadingState } from '@metafam/ds';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useOnScreen } from '../../../lib/hooks/useOnScreen';
import { LIMIT, URL } from '../../../utils/LatestContentHelpers';

interface Video {
  id: string;
  videoId: string;
  title: string;
}

export const Watch: React.FC = () => {
  const [videos, setVideos] = useState<Array<Video> | []>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const onScreen = useOnScreen(moreRef);

  const maxPages = useMemo(() => {
    const pages = Math.ceil(count / LIMIT) || 0;
    return pages;
  }, [count]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(URL).then((r) => r.json());
      const videosList = res.items
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          res.items.map((video: any) => ({
            id: video.id,
            videoId: video.snippet.resourceId.videoId,
            title: video.snippet.title,
          }))
        : [];
      setNextPageToken(res.nextPageToken);
      setVideos(videosList);
      setCount(res.pageInfo ? res.pageInfo.totalResults : null);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (!loading && onScreen && page <= maxPages && nextPageToken) {
      setIsFetchingMore(true);
      const fetchMoreURL = `${URL}&pageToken=${nextPageToken}`;

      fetch(fetchMoreURL)
        .then((r) => r.json())
        .then((res) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newItems = res.items.map((video: any) => ({
            id: video.id,
            videoId: video.snippet.resourceId.videoId,
            title: video.snippet.title,
          }));

          setVideos((prevVideos) => [...prevVideos, ...newItems]);
          setPage((prevPage) => prevPage + 1);
          setNextPageToken(res.nextPageToken);
        });

      setIsFetchingMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreen]);
  return (
    <>
      {loading ? (
        <LoadingState />
      ) : (
        <Box>
          {videos.map((video: Video) => {
            const url = `https://www.youtube.com/embed/${video?.videoId}`;
            return (
              <AspectRatio key={video.id} ratio={2 / 1}>
                <Box
                  as="iframe"
                  title={video?.title}
                  src={url}
                  allowFullScreen
                  pt={4}
                />
              </AspectRatio>
            );
          })}
        </Box>
      )}
      <span ref={moreRef} />
      {isFetchingMore && <LoadingState />}
    </>
  );
};
