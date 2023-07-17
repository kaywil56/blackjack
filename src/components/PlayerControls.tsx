interface IPlayerControlsProps{
    hit: () => void
}

const PlayerControls = ({ hit }: IPlayerControlsProps) => {
    return <div>
        <button onClick={hit}>Hit</button>
        <button>Stand</button>
    </div>
}

export default PlayerControls