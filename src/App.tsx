import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState } from 'react';
import CandyMachine from './CandyMachine/CandyMachine';
import MintContainerDesktopView from './components/desktopView/MintContainerDesktopView';
import MintContainerMobileView from './components/mobileView/MintContainerMobileView';
import WalletButton from './components/WalletButton';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new SolanaMobileWalletAdapter({
                appIdentity: { name: 'Solana Create React App Starter App' },
                authorizationResultCache: createDefaultAuthorizationResultCache(),
                cluster: network
            }),
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    const [completed, setCompleted] = useState(50)
    const [candyMachine, setCandyMachine] = useState(null)
    const [walletAddress, setWalletAddress] = useState(null)
    const {publicKey} = useWallet()
    const [whitelistLaunchDate, setWhitelistLaunchDate] = useState(process.env.REACT_APP_LAUNCH_EPOCH)

    return (
        <div className="App">
            {/* Desktop wallet connection */}
            <div className='absolute lg:top-4 lg:right-10 top-2 right-0 bg-indigo-900 rounded'>
                <WalletMultiButton />
            </div>

            {/* Mobile Wallet */}
            {/* <WalletButton />  */}

            <CandyMachine walletAddress={publicKey} candyMachine={candyMachine} setCandyMachine={setCandyMachine}/> 

            <div id='mobile-view' className='h-full w-full block lg:hidden'>
                {candyMachine && <MintContainerMobileView completed={completed} setCompleted={setCompleted} candyMachine={candyMachine} walletAddress={publicKey} whitelistLaunchDate={whitelistLaunchDate} />}
            </div>

            <div id='desktop-view' className='hidden lg:block w-[90%] h-[80%] absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4 shadow-lg '>
                {candyMachine && <MintContainerDesktopView completed={completed} setCompleted={setCompleted} candyMachine={candyMachine} walletAddress={publicKey} whitelistLaunchDate={whitelistLaunchDate} />}
            </div>
        </div>
    );
};
