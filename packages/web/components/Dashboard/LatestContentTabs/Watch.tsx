import { AspectRatio, Box, LoadingState } from '@metafam/ds';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useOnScreen } from '../../../lib/hooks/useOnScreen';
import { LIMIT, URL } from '../../../utils/LatestContentHelpers';

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};
interface Video {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    playlistId: string;
    position: number;
    publishedAt: string;
    resourceId: {
      kind: string;
      videoId: string;
    };
    title: string;
    videoOwnerChannelId: string;
    videoOwnerChannelTitle: string;
    thumbnails: {
      default?: Thumbnail;
      high?: Thumbnail;
      medium?: Thumbnail;
      standard?: Thumbnail;
      maxres?: Thumbnail;
    };
  };
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

      setNextPageToken(res.nextPageToken);
      setVideos(res.items);
      setCount(res.pageInfo.totalResults);
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
          setVideos((prevVideos) => [...prevVideos, ...res.items]);
          setPage((prevPage) => prevPage + 1);
          setNextPageToken(res.nextPageToken);
        });

      setIsFetchingMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreen]);
  return loading ? (
    <LoadingState />
  ) : (
    <Box>
      {videos.map((video: Video) => {
        const url = `https://www.youtube.com/embed/${video?.snippet?.resourceId?.videoId}`;
        return (
          <AspectRatio key={video.id} ratio={2 / 1}>
            <Box
              as="iframe"
              title={video?.snippet?.title}
              src={url}
              allowFullScreen
              pt={4}
            />
          </AspectRatio>
        );
      })}
      {isFetchingMore && <LoadingState />}
      <span ref={moreRef} />
    </Box>
  );
};
