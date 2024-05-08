import type { Metadata } from 'next';

import { ApolloWrapper } from '@/providers/ApolloProvider';

export const metadata: Metadata = {
  title: 'Frontend Assessment',
  description: 'Frontend Assessment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
