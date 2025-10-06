import React, { FC } from "react";
import clsx from "clsx";

interface SpinnerProps {
  size?: number; 
  colorClass?: string; 
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ size = 40, colorClass = "border-cyber-blue", className }) => {
  return (
    <div
      className={clsx(
        "border-4 border-t-transparent border-solid rounded-full animate-spin",
        colorClass,
        className
      )}
      style={{ width: size, height: size }}
    />
  );
};

export default React.memo(Spinner);
