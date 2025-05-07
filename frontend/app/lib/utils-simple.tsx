/**
 * A simple utility to conditionally join class names
 */
export function cn(...classes: (string | undefined | boolean)[]) {
    return classes.filter(Boolean).join(" ")
  }
  