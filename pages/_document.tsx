import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Anti-FOUC: hide page until all styles are ready */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.style.opacity='0';document.addEventListener('DOMContentLoaded',function(){document.documentElement.style.transition='opacity 0.15s ease';document.documentElement.style.opacity='1';});})();`,
          }}
        />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Swiper CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
        {/* Swiper JS - deferred so it does not block render */}
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
