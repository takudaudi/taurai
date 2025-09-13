"use client";

import { IKImage } from "imagekitio-next";
import NextImage from "next/image";

type ImageType = {
  path?: string;
  src?: string;
  w?: number;
  h?: number;
  alt: string;
  className?: string;
  tr?: boolean;
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

if (!urlEndpoint) {
  throw new Error('Error: Please add urlEndpoint to .env or .env.local')
}

const Image = ({ path, src, w, h, alt, className, tr }: ImageType) => {
  // If path starts with "icons/" or "general/", use Next.js Image for local assets
  if (path && (path.startsWith("icons/") || path.startsWith("general/"))) {
    return (
      <NextImage
        src={`/${path}`}
        width={w || 24}
        height={h || 24}
        alt={alt}
        className={className}
      />
    );
  }

  // Otherwise, use ImageKit for remote assets
  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      path={path}
      src={src}
      {...(tr
        ? { transformation: [{ width: `${w}`, height: `${h}` }] }
        : { width: w, height: h })}
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      className={className}
    />
  );
};

export default Image;
