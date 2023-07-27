import { useEffect, useState } from "react";

export default function CheckMobile() {
  const [isMobile, setIsMobile] = useState(false);

  const checkMobiles = () => {
    setIsMobile(window.matchMedia("(max-width: 900px)").matches);
  };

  useEffect(() => {
    checkMobiles();
    window.addEventListener("resize", checkMobiles);
    return () => {
      window.removeEventListener("resize", checkMobiles);
    };
  }, []);

  return isMobile;
}
