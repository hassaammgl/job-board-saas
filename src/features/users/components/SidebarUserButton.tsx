import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import SidebarUserButtonClient from "./_SidebarUserButtonClient";

export function SidebarUserButton() {
  return (
    <Suspense>
      <SidebarUserSuspense />
    </Suspense>
  );
}

async function SidebarUserSuspense() {
  const { userId } = auth();
  return (
    <SidebarUserButtonClient
      user={{ name: "ratx16", email: "abc@xyz.com", imageUrl: "" }}
    />
  );
}
