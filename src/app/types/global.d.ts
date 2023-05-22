declare module '*.module.scss';

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module '*.svg?inline' {
    const content: unknown;
    export default content;
}
  
declare module '*.svg' {
    import React = require('react');
  
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare const __IS_DEV__: boolean;