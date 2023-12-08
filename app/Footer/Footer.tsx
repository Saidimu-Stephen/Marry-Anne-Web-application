/** @format */

import FacebookIcon from "../Icons/FacebookIco";
import InstagramIcon from "../Icons/InsstagramIcon";
import TwitterIcon from "../Icons/TwiterIcon";

function Footer() {
  return (
    <div className="bg-gray-400 text-white py-4">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="flex mr-10 ml-10 gap-16 justify-center">
          {/* Twitter icon */}
          <TwitterIcon />

          {/* Instagram icon */}
          <InstagramIcon />

          {/* Facebook icon */}
          <FacebookIcon />
        </div>
      </div>
    </div>
  );
}

export default Footer;
