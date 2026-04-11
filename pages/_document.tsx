import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Anti-FOUC: Hide page immediately, reveal only after Tailwind has fully processed */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.style.opacity='0';document.addEventListener('DOMContentLoaded',function(){document.documentElement.style.transition='opacity 0.15s ease';document.documentElement.style.opacity='1';});})();`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
