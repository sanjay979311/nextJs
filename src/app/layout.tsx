'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import { GlobalProvider } from "./GlobalProvider";
import { useEffect } from "react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap.bundle.min.js') : null
  }, [])



  return (
    <html lang="en">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
      <body >

        <GlobalProvider>
          <Header />
          {children}
          <Footer />
        </GlobalProvider>


        {/* <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" ></Script>
       <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"></Script> */}
      </body>
    </html>
  );
}
