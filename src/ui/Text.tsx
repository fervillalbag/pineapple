import { VariantProps, cva } from "class-variance-authority";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "../utils";

interface IText
  extends DetailedHTMLProps<
      HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >,
    VariantProps<typeof textVariants> {}

export const textVariants = cva("font-sans text-@sura-primary-900", {
  variants: {
    variant: {
      body: "text-base leading-5 text-@sura-primary-400",
      subtitle: "text-lg font-medium",
      heading: "font-semibold text-4xl",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const Text: React.FC<IText> = ({
  children,
  variant,
  className,
  ...props
}) => {
  return (
    <p
      className={cn(textVariants({ variant, className }))}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
