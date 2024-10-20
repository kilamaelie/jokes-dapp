'use client';
import { WagmiProvider } from 'wagmi';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { config } from '@/config/config';
import theme from '@/common/constant/theme';

export default function Providers({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000,
        gcTime: 10 * (60 * 1000),
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
