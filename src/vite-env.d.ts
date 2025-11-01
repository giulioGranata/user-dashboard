/// <reference types="vite/client" />

// Override CSS module declarations to improve IDE navigation
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
