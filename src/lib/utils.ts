import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PREFIX = ["https://koia-eg.com/dashboard/uploads/sliders/", "https://koia-eg.com/dashboard/uploads/services/", "https://koia-eg.com/dashboard/uploads/projects/"];

export const cleanImageUrl = (url: string) => {

  for (let i = 0; i < PREFIX.length; i++) {
    if (url.includes(PREFIX[i])) {
      return url.replace(PREFIX[i], "");
    }
  }

  return url;
};