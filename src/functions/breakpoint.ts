import useMediaQuery from '@mui/material/useMediaQuery';

// https://tailwindcss.com/docs/responsive-design#overview
export function isSm() {
  return useMediaQuery('(min-width:640px)');
}
export function isMd() {
  return useMediaQuery('(min-width:768px)');
}
export function isLg() {
  return useMediaQuery('(min-width:1024px)');
}
export function isXl() {
  return useMediaQuery('(min-width:1280px)');
}
export function is2Xl() {
  return useMediaQuery('(min-width:1536px)');
}
