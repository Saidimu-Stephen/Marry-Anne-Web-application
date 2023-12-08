/** @format */

import React, { useRef, useEffect, useState } from "react";

function MainPage() {
  const [hasOverflow, setHasOverflow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null); // Explicitly setting the type

  useEffect(() => {
    const container = containerRef.current;
    if (container?.scrollHeight && container?.clientHeight) {
      if (container.scrollHeight > container.clientHeight) {
        setHasOverflow(true);
      } else {
        setHasOverflow(false);
      }
    }
  }, []);

  return (
    <div
      className={`w-full bg-slate-400 rounded-lg relative border-2 border-white ${
        hasOverflow ? "overflow-y-auto" : ""
      }`}
      ref={containerRef}
      style={{ maxHeight: "calc(100vh - 100px)" }} // Example max height to show scrollbar
    >
      {/* Your content */}
      {/* Example content to test overflow */}
      <div style={{ height: "200px" }}>
        Content that exceeds the container height to test overflow.
      </div>
    </div>
  );
}

export default MainPage;
