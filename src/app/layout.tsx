import { Metadata } from 'next';

import '@global/index.scss';

import PageWrapper from '@/components/page-wrapper';
import TopNavBar from '@/components/TopNavBar';
import ThemeRegistry from '@/theme/Theme-Registry';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: `TypeScript starter for Next.js`,
  description: `TypeScript starter for Next.js that includes all you need to build amazing apps`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                zIndex: 999999,
              },
              error: {
                style: {
                  // border: 'thin solid red',
                  // backgroundColor: '#FFEFEF',
                },
              },
            }}
          />
          <TopNavBar />
          <PageWrapper>{children}</PageWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
