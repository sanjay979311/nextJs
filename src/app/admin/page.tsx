

// 'use client'
// // import "bootstrap/dist/css/bootstrap.min.css"
// // import "./globals.css";

// import Script from "next/script";
// import { useEffect } from "react";




// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {

//     useEffect(() => {
//         require("bootstrap/dist/js/bootstrap.bundle.min.js");
//     }, []);
//     return (
//         <html lang="en">
//             <body >
//                 {children}
//                 {/* <GlobalProvider />
       
//         <Header />
//         {children}
//         <Footer /> */}


//             </body>
//         </html>
//     );
// }


export default function Home() {
    return (
        <>
            <div className="mt-4 p-5 bg-primary text-white rounded">
                <h1> Admin Home Page </h1>
                <p> This is admin route </p>
            </div>
        </>
    );
}
