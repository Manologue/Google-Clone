import { Rings } from "react-loader-spinner";

import React from "react";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Rings type="Puff" color="#00BFFF" height={100} width={100} />
    </div>
  );
};
