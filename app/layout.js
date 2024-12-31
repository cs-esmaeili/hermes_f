import '@/styles/globals.css';
import config from "@/config.json";
import 'react-image-crop/dist/ReactCrop.css';
import translation from '@/translation/translation';


export const metadata = {
  title: config.app_name,
  description: config.site_description,
}


export default function RootLayout({ children }) {
  return (
    <html className='font-yekanBakh' lang={translation.getCurrentLanguage()}>
      <body>{children}</body>
    </html>
  )
}
