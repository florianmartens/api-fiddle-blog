import type { DocumentGen } from "contentlayer2/core";

export const urlFromFilePath = (
  page: DocumentGen,
  includeOrder?: boolean
): string => {
  let urlPath = page._raw.flattenedPath;
  if (!urlPath.startsWith("/")) urlPath = `/${urlPath}`;

  if (!includeOrder)
    urlPath = urlPath
      .split("/")
      .map((segment: string) => segment.replace(/^\d\d\d\-|^\d\d\d\d\-/, ""))
      .join("/");

  return urlPath;
};
