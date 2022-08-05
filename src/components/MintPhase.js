import CountdownTimer from "./CountdownTimer"

export default function MintPhase({candyMachine, launchDate, phase}){
    const currentDate = new Date()
    const publicDropDate = new Date(candyMachine.state.goLiveData * 1000)
    const whitelistDropDate = new Date(launchDate * 1000)

    const renderWhitelist = candyMachine.state.isSoldOut ? "Sold out" : ((phase === 'Whitelist') && whitelistDropDate > currentDate) ? <CountdownTimer candyMachine={candyMachine} dropDate={whitelistDropDate} /> : "Live"
    const renderPublic = candyMachine.state.isSoldOut ? "Sold out" : ((phase === 'Public') && publicDropDate > currentDate) ? <CountdownTimer candyMachine={candyMachine} dropDate={publicDropDate} /> : "Live"
    return(
        <div className="w-[100%] flex flex-col bg-plBlack rounded px-4 py-2 gap-y-6 shadow-lg border-plDarkYellow border-[1px] md:border-none">
            <div className="flex justify-between text-white text-xs md:text-base lg:text-lg relative">
                <div className="bg-plDarkGrey py-1 px-4 rounded">{phase}</div>
                <div className="text-plDarkYellow font-semibold">{phase === 'Whitelist' ? renderWhitelist : renderPublic}</div>
            </div>
            <div className="text-white flex gap-x-[4px] lg:gap-x-1 text-xs md:text-sm lg:text-base">
                <div>{`Whitelist Supply ${process.env.REACT_APP_SUPPLY}`}</div>
                <div className=" hidden lg:block"> - </div>
                <div>Max Mint 5 per person </div>
                <div className=" hidden lg:block"> - </div>
                <div>{` ${phase === "Whitelist" ? process.env.REACT_APP_WHITELIST_PRICE : process.env.REACT_APP_PUBLIC_PRICE} Sol`}</div>
            </div>
        </div>
    )
}