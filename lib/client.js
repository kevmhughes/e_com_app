import sanityClient from "@sanity/client";
import { ImageUrlBuilder } from "@sanity/image-url";

export const client = sanityClient({
    projectId: "e7zeczxk",
    dataset: "production", // to know if we are in developemnt or production
    apiVersion: "2023-16-03",
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})