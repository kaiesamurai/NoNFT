import { useEffect } from "react";

export default function SayHi() {
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction) {
      fetch("https://ekza.space/hi/", { method: "GET" });
    }
  }, []);

  return null;
}
