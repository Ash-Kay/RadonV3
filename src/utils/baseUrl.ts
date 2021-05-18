// export const getBaseMediaUrl = (): string => {
//     switch (process.env.NODE_ENV) {
//         case "development":
//             return "http://localhost:3000/";

//         case "production":
//             return "https://radiumbucket.s3.ap-south-1.amazonaws.com/";

//         default:
//             return "http://localhost:3000/";
//     }
// };

export const getBaseUrl = (): string => {
    switch (process.env.NODE_ENV) {
        case "development":
            return "http://localhost:3000/api/v1";

        case "production":
            return "https://memenese.com/api/v1";

        default:
            return "http://localhost:3000/api/v1";
    }
};
