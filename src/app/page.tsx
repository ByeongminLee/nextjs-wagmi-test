'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAccount, useConnect } from 'wagmi';

export default function Home() {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const { address, connector, isConnected } = useAccount();
    const router = useRouter();

    return (
        <main className="flex items-center justify-center w-full h-[100vh] p-5">
            <div className="flex flex-col items-center justify-center w-full h-[100vh] p-5">
                {!address &&
                    connectors.map((connector) => (
                        <button
                            className="flex items-center justify-center w-full gap-3 py-3 border-0 rounded-lg bg-slate-500"
                            disabled={!connector.ready}
                            key={connector.id}
                            onClick={() => connect({ connector })}
                        >
                            <Image src="/metamask.png" width={30} height={30} alt="metamask" />
                            {connector.name}
                            {!connector.ready && ' (unsupported)'}
                            {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
                        </button>
                    ))}
                {error && <div>{error.message}</div>}
                <div>
                    {address && (
                        <div className="text-[#fffff] text-center">
                            <p>address</p>
                            <p>{address}</p>
                        </div>
                    )}
                </div>
                <button
                    className="flex p-5 mt-5"
                    onClick={() =>
                        router.push('https://metamask.app.link/dapp/nextjs-wagmi-test.vercel.app/')
                    }
                >
                    test
                </button>
            </div>
        </main>
    );
}
