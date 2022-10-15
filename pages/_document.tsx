import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat+Subrayada&display=swap" rel="stylesheet" /> 
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/monokai.min.css" />
          <script>hljs.initHighlightingOnLoad();</script>
          <script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
          {/* <script>
            {String.raw `
              MathJax = {
                tex: {
                  inlineMath: [
                    ['$', '$'],
                    ['\\(', '\\)']
                  ],
                  displayMath: [
                    ['$$', '$$'],
                    ['\\[', '\\]']
                  ]
                },
                options: {
                  skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"]
                }
              }
            `}
          </script> */}
        </Head>
        <body className='-m-0'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}