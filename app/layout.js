import '@/styles/globals.css';
import 'react-image-crop/dist/ReactCrop.css';
import translation from '@/translation/translation';

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
}


export default function RootLayout({ children }) {
  return (
    <html className='font-yekanBakh' lang={translation.getCurrentLanguage()}>
      <body>{children}</body>
    </html>
  )
}
