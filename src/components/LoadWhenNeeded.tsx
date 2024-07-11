import React, { Suspense, ReactNode } from "react";
import { Button } from "./ui/button";

interface ToggleableComponentProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  buttonClasses?: string;
  variant?: "default" | "destructive" | "outline" | "ghost";
  buttonText?: string;
}

const ToggleableComponent: React.FunctionComponent<
  ToggleableComponentProps
> = ({
  isVisible,
  setIsVisible,
  children,
  buttonText,
  buttonClasses,
  variant,
}) => {
  return (
    <>
      <Button
        variant={variant || "default"}
        className={`${buttonClasses}`}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {buttonText}
      </Button>
      {isVisible && <Suspense>{children}</Suspense>}
    </>
  );
};

export default ToggleableComponent;
