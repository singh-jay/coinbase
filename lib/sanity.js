import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "27z8j83y",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skHZ3mFXVbcuUekD9L29TqU8yV8YCaWGtoPD0SSZuuSxdlJMA1KHFTq1HCxhDp8M7971Q2oz4965ZIEqtlpmlUwY8RrIjTxJn6FLBfSvRSFsw3Kum4gmU2Tjzdq1A0dLZ2w7NqKh29k4v2uVJjfplJBUiBSGd4U8EsCmbgHrLPHjZ0wvP5VK",
  useCdn: false,
});
