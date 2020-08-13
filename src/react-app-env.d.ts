declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";
        PORT: string;
    }
}

/// <reference types="react-scripts" />

declare module "*.svg" {
    const content: any;
    export default content;
}
