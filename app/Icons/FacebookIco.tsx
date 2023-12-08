/** @format */

import React from "react";

interface IconProps {
  width?: string;
  height?: string;
}

function FacebookIcon({ width = "30px", height = "30px" }) {
  return (
    <div
      style={{ width: "5%", height: "5%" }}
      className="text-indigo-400flex flex-col justify-center">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink">
        <path
          d="M374.245,285.825l14.104,-91.961l-88.233,0l0,-59.677c0,-25.159 12.325,-49.682 51.845,-49.682l40.117,0l0,-78.291c0,0 -36.408,-6.214 -71.214,-6.214c-72.67,0 -120.165,44.042 -120.165,123.775l0,70.089l-80.777,0l0,91.961l80.777,0l0,222.31c16.197,2.542 32.798,3.865 49.709,3.865c16.911,0 33.512,-1.323 49.708,-3.865l0,-222.31l74.129,0Z"
          style={{ fill: "#1877f2", fillRule: "nonzero" }}
        />
      </svg>
      <span className=" text-white-400  text-sm flex hover:text-indigo-600 ">
        Facebook
      </span>
    </div>
  );
}

export default FacebookIcon;
