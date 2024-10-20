import { http, createConfig } from 'wagmi';
import { sepolia, foundry } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [sepolia, foundry],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
    [foundry.id]: http(),
  },
  ssr: true,
});
