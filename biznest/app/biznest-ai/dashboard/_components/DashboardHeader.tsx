import { UserButton } from "@clerk/nextjs";
import React from "react";

function DashboardHeader() {
  return (
    <div className="p-5 shadow-lg border-b flex justify-between rounded-xl">
      <div><span className="text-2xl font-bold">BizNest AI</span></div>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default DashboardHeader;
