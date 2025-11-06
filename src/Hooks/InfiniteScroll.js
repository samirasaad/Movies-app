import { useState, useEffect, useRef } from "react";

export function useInfiniteScroll(fetchData, debouncedSearchTrm) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // Reset items and page when search changes
  useEffect(() => {
    setItems([]);
    setPage(0);
    setHasMore(true);
  }, [debouncedSearchTrm]);

  useEffect(() => {
    if (page === 0) return; // Skip initial load when page is 0
    const loadMore = async () => {
      if (isLoading || !hasMore) return;
      setIsLoading(true);

      try {
        const res = await fetchData(page, debouncedSearchTrm);
        if (res.results.length === 0 || res.total_results === items.length) {
          setHasMore(false);
        } else {
          setItems((prev) => [...prev, ...res.results]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMore();
  }, [page]);

  useEffect(() => {
    if (hasMore  ) {
      const observer = new IntersectionObserver(
        (entries) => {
          //   entries[0].isIntersecting gives true if loader is visible in viewport
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            setPage((p) => (p === 0 ? 1 : p + 1)); // Start at page 1
          }
        },
        // threshold defines how much of the target element must be visible
        // 1.0 fully visible
        // 0.5 half visible
        { threshold: 1.0 }
      );
      // loader is the observer target
      // which will be observed if exited in view port to re-request new data
      if (loaderRef.current) observer.observe(loaderRef.current);
      return () => observer.disconnect();
    }
  }, [hasMore, isLoading]);

  return { items, isLoading, hasMore, loaderRef };
}
