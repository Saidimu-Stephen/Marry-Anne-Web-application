/** @format */

import React from "react";
import menu from "@/app/Utils/Menu";
import Image from "next/image";

function Profile() {
  return (
    <div className="flex justify-center p-2">
      <div className=" justify-center flex-col">
        <div>
          <Image
            className="bg-slate-100 rounded-3xl"
            width={70}
            height={70}
            src={"/download.png"}
            alt={"Profile"}
          />
        </div>
        <div>
          {/* will fix direct name from props recieved  */}
          <h3 className="text-sm">Stephen Saidimu</h3>
        </div>
      </div>
    </div>
  );
}

export default Profile;
