import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function WalletButton(){
    const {setVisible} = useWalletModal()

    return(
        <button onClick={setVisible} className="text-white bg-indigo-700 p-3 font-bold tracking-wide rounded">
            Connect Wallet
        </button>
    )
}