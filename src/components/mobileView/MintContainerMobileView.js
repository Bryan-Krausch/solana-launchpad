import image_0 from "../../assets/0.png"
import image_1 from "../../assets/1.png"
import image_2 from "../../assets/2.png"
import {useState, useEffect} from 'react'
import ProgressBar from "../Progressbar"
import MintPhase from "../MintPhase"
import { mintToken } from "../../libs/Mint"


export default function MintContainerMobileView({completed, setCompleted, candyMachine, walletAddress, whitelistLaunchDate}){
    const [active, setActive] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            switch(active){
                case 0:
                    setActive(1)
                    break
                case 1:
                    setActive(2)
                    break
                case 2:
                    setActive(0)
                    break
                default:
                    console.log("Out of switch")
            }
        }, 4000)
        return () => clearInterval(interval)
    }, [active])

    useEffect(() => {
        let result = (candyMachine.state.itemsRedeemed * 100) / candyMachine.state.itemsAvailable
        setCompleted(result)
    }, [])

    const currentDate = new Date()
    const dropDate = new Date(candyMachine.state.goLiveData * 1000)
    

    return(
        <div className="h-screen w-screen bg-plBlack overflow-y-auto p-10">
            <div className="flex flex-col gap-y-4">
                <h1 className="text-white font-bold uppercase tracking-widest text-xl">{process.env.REACT_APP_PROJECT_NAME}</h1>
                <div id="container-badge" className="flex gap-x-4 text-xs -pt-2">
                    <div className="border-[1px] border-plDarkYellow text-plDarkYellow p-1.5 rounded">Supply {process.env.REACT_APP_SUPPLY} 📦</div>
                    <div className="border-[1px] border-plDarkYellow text-plDarkYellow p-1.5 rounded">Status {candyMachine.state.isSoldout && "Sold Out ❌"} {currentDate > dropDate ? "Live 🔴" : "Close ⚫" }</div>
                    <div></div>
                </div>
                <p className="text-sm text-plGrey text-justify leading-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Dicta minus quasi beatae at, reiciendis perferendis explicabo nihil dolor molestiae atque mollitia, maxime, libero vero praesentium modi unde? 
                    Fuga, natus itaque?
                </p>
            </div>
            <div className="pt-10 flex justify-center">
                <img src={image_0} alt="preview_1" className={`${active === 0 ? "block" : "hidden"} rounded-lg`} />
                <img src={image_1} alt="preview_2" className={`${active === 1 ? "block" : "hidden"} rounded-lg`}/>
                <img src={image_2} alt="preview_3" className={`${active === 2 ? "block" : "hidden"} rounded-lg`}/>
            </div>
            <div className="pt-5">
                <div className="text-white pb-2">Supply Minted : {candyMachine.state.itemsRedeemed}</div>
                <ProgressBar completed={completed}/>
            </div>

            <div className="mt-5 flex justify-center w-full lg:hidden">
                {walletAddress ? 
                    (!candyMachine.state.isSoldout && candyMachine.state.isActive) ?
                        <button className="bg-plGrey text-black rounded text-white w-[75%]  p-2 mt-5" onClick={() => mintToken(walletAddress, candyMachine)}>
                            Mint NFT
                        </button>
                    :
                        <button className="bg-darkGrey rounded text-white w-[75%]  p-2 mt-5 border-plDarkYellow border-[1px]" disabled>
                            Sold Out
                        </button>
                :
                    <button className="bg-darkGrey rounded text-white w-[75%]  p-2 mt-5 border-plDarkYellow border-[1px]" disabled>
                        Connect your Wallet
                    </button>
                }
            </div>
            
            <div id="mint-phase-container" className="flex flex-col gap-y-4 pt-6">
                <MintPhase candyMachine={candyMachine} launchDate={whitelistLaunchDate} phase={'Whitelist'}/>
                <MintPhase candyMachine={candyMachine} launchDate={whitelistLaunchDate} phase={'Public'}/>
            </div>
        </div>
    )
}