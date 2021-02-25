export const getBaseMediaUrl = (): string => {
    if (process.env.REACT_APP_ENV === "development") return "http://localhost:3000/";
    else return "https://radiumbucket.s3.ap-south-1.amazonaws.com/";
};

export const getBaseUrl = (): string => {
    console.log(process.env.REACT_APP_ENV);
    if (process.env.REACT_APP_ENV === "development") return "http://localhost:3000/api/v1";
    else return "http://ec2-13-233-186-190.ap-south-1.compute.amazonaws.com:3000/api/v1";
};
