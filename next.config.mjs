/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
  env: {
    API_URL: "http://localhost:3000",
    NEXTAUTH_URL: "http://localhost:3000",
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/demo",
    DB_URI: "",

    STRIPE_WEBHOOK_SECRET: "",

    STRIPE_SECRET_KEY: "",

    CLOUDINARY_CLOUD_NAME: "",
    CLOUDINARY_API_KEY: "",
    CLOUDINARY_API_SECRET: "",

    SMTP_HOST: "sandbox.smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "",
    SMTP_PASSWORD: "",
    SMTP_FROM_EMAIL: "noreply@bookit.com",
    SMTP_FROM_NAME: "BookIT",

    GEOCODER_PROVIDER: "drajqohpv",
    GEOCODER_API_KEY: "864257176237652",
    MAPBOX_ACCESS_TOKEN: "NcMS74B2Jf3nHnbBZxB9Xymzdg0",

    NEXTAUTH_SECRET: "KSDFJKLSDJFLKSDFJSLDKF934KJLDJGDLKGFJDF",
    REVALIDATE_TOKEN: "JK34J50JSDKFLJSDKF034I5DKFJSDK4IJFKSDJFL",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
