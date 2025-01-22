import { useEffect } from "react";
import { useRouter } from "next/router";

const ScrollPositionManager = () => {
  const router = useRouter();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";

      const handleRouteChangeStart = () => {
        sessionStorage.setItem(
          `scroll-position-${router.asPath}`,
          JSON.stringify({ x: window.scrollX, y: window.scrollY })
        );
      };

      const handleRouteChangeComplete = (url: string) => {
        const savedPosition = sessionStorage.getItem(`scroll-position-${url}`);
        if (savedPosition) {
          const { x, y } = JSON.parse(savedPosition);
          window.scrollTo(x, y);
        }
      };

      router.events.on("routeChangeStart", handleRouteChangeStart);
      router.events.on("routeChangeComplete", handleRouteChangeComplete);

      return () => {
        router.events.off("routeChangeStart", handleRouteChangeStart);
        router.events.off("routeChangeComplete", handleRouteChangeComplete);
      };
    }
  }, [router]);

  return null;
};

export default ScrollPositionManager;
