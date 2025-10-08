import React, { type FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Spinner from "@/components/ui/Spinner";

interface LoaderProps {
  message?: string;
}

const Loader: FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-boostlab-bg flex flex-col items-center justify-center z-50 bg-[url('https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg')]">
      <Card className="border-none">
        <CardContent className="flex items-center justify-center">
          <Spinner className="w-10 h-10 text-white rounded-full" />
        </CardContent>
      </Card>

      <h1 className="mt-6 text-3xl font-cyber text-white animate-glow text-center">
        {message}
      </h1>

      <p className="mt-2 text-base font-inter text-white animate-pulse-slow">
        Please wait
      </p>
    </div>
  );
};

export default React.memo(Loader);
