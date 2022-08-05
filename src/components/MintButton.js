import React, {useEffect} from 'react'
import { render } from 'react-dom'
import { mintToken } from '../libs/Mint'

export default class MintButton extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userIsWhitelisted: this.props.userIsWhitelisted,
            currentPhase: null,
            currentDate: new Date(),
            whitelistDate: new Date(process.env.REACT_APP_LAUNCH_EPOCH * 1000),
            publicDate: new Date(this.props.candyMachine.state.goLiveData * 1000)
        }
    }

    componentDidMount(){
        if(this.props.candyMachine.state.isSoldOut){
            this.setState({
                currentPhase: "soldOut"
            })
        }else{
            if(this.state.currentDate < this.state.whitelistDate){
                this.setState({
                    currentPhase: "notStarted"
                })
            }else{
                if(this.state.currentDate > this.state.publicDate){
                    this.setState({
                        currentPhase: "public"
                    })
                }else{
                    this.setState({
                        currentPhase: "whitelist"
                    })
                }
            }
        }
    }
    
        
        
    render(){
        const renderSwitchButton = (currentPhase) => {
            switch(this.state.currentPhase){
                case 'soldOut':
                    return(
                    <button className="bg-darkGrey rounded text-white w-[75%]  p-2 mt-5 border-plDarkYellow border-[1px]" disabled>
                        Sold Out
                    </button>
                    )
                    
                case 'notStarted':
                    return(
                    <button className="bg-darkGrey rounded text-white w-[75%]  p-2 mt-5 border-plDarkYellow border-[1px]" disabled>
                        Wait Whitelist Mint
                    </button>
                    )
                case 'public':
                    return(
                    <button className="bg-plGrey text-black rounded text-white w-[75%]  p-2 mt-5" onClick={() => mintToken(this.props.walletAddress, this.props.candyMachine)}>
                        Mint NFT
                    </button>
                    )
                case 'whitelist':
                    if(this.state.userIsWhitelisted){
                        return(
                        <button className="bg-plGrey text-black rounded text-white w-[75%]  p-2 mt-5" onClick={() => mintToken(this.props.walletAddress, this.props.candyMachine)}>
                            Mint NFT
                        </button>
                        )
                    }else{
                        return(
                        <button className="bg-plGrey text-black rounded text-white w-[75%]  p-2 mt-5" disabled>
                            Your are not whitelisted
                        </button>
                        )
                    }
                default:
                    return(
                    <button className="bg-darkGrey rounded text-white w-[75%]  p-2 mt-5 border-plDarkYellow border-[1px]" disabled>
                        Out
                    </button>
                    )
            }
        }
        
        return(
            <div className="mt-10 flex justify-center w-full pb-6">{renderSwitchButton()}</div>
        )
    }
}