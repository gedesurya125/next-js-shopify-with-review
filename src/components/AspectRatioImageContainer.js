import React from "react";
import Image from "next/image";

// External Components
import { Box } from "@thepuzzlers/pieces";

export const getAspectRatio = (aspectRatio) =>
  aspectRatio ? `${(1 / aspectRatio) * 100}%` : null;
export const getPaddingPercentageForAspectRatio = (aspectRatios) => {
  if (Array.isArray(aspectRatios))
    return aspectRatios.map((aspectRatio) => getAspectRatio(aspectRatio));
  return getAspectRatio(aspectRatios);
};

//? Note: in next js we always have to define the image height and width, if we use Next Image, so the best option is using aspect ratio component

export const AspectRatioImageContainer = ({
  src,
  alt,
  aspectRatios,
  className,
  designatedRef,
  sx,
  imgProps,
  imgStyle,
  children,
  ...props
}) => {
  return (
    <Box
      ref={designatedRef}
      className={`image-container ${className}`}
      sx={{
        position: "relative",
        // padding is refer to parrent element so it will not work if this element has width is set, it will still refer the the width of paret element
        // https://css-tricks.com/oh-hey-padding-percentage-is-based-on-the-parent-elements-width/
        // pt: getPaddingPercentageForAspectRatio(aspectRatios),
        overflow: "visible",
        width: "100%",
        ...sx,
      }}
      {...props}
    >
      <Box
        className="space-maker visibility-hidden-element"
        sx={{
          pt: getPaddingPercentageForAspectRatio(aspectRatios),
          visibility: "hidden",
        }}
      />
      <Image
        {...imgProps}
        style={{
          objectFit: "cover",
          ...imgStyle,
        }}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={src}
        alt={alt ? alt : ""}
      />
      {/* Children meant to be use for adding any absolute style decoration */}
      {children}
    </Box>
  );
};
