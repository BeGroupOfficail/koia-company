import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PREFIX = "https://koia-eg.com/dashboard/uploads/sliders/";

export const cleanImageUrl = (url: string) => {
  if (url.includes(PREFIX)) {
    return url.replace(PREFIX, "");
  }

  return url;
};