export default function ProgressBar({completed}){
    return(
        <div className="h-[20px] w-full bg-plGrey rounded-[50px]">
            <div className={`h-full bg-plDarkYellow rounded-[50px] text-right transition-[width] ease-in-out`} 
                 style={{width: `${completed}%`}}
            >
                <span className="pr-1 text-white text-sm">{`${completed}%`}</span>
            </div>
        </div>
    )
}