declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}
