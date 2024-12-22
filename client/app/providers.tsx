"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
}
