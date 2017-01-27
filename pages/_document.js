import Document, {Head, Main, NextScript} from 'next/document'

// GOTCHA: next.js requires this to be a class :(
class MyDocument extends Document {
  render () {
    return (
     <html>
       <Head>
        <link rel="stylesheet" href="/static/styles/index.css" />
        <link rel="stylesheet" href="/static/styles/themes/default/index.css" />
        <link rel="stylesheet" href="/static/styles/themes/90s/index.css" />
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}

export default MyDocument;