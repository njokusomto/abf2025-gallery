import Document, { Head, Html, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/cropped-Fav.png" />
          <meta
            name="description"
            content="See pictures from the 2025 edition of the Africa Blockchain Festival."
          />
          <meta property="og:site_name" content="Africa Blockchain Festival 2025 Photos | Relive the experience! 💫" />
          <meta
            property="og:description"
            content="See pictures from the 2025 edition of the Africa Blockchain Festival."
          />
          <meta property="og:title" content="Africa Blockchain Festival 2025 Pictures" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Africa Blockchain Festival 2025 Pictures" />
          <meta
            name="twitter:description"
            content="See pictures from the 2025 edition of the Africa Blockchain Festival."
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
