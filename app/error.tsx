"use client";

import { useEffect } from "react";
import { Button } from "@/components/atoms/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold text-white">
        Something went wrong!
      </h2>
      <p className="mb-4 text-gray-400">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}

