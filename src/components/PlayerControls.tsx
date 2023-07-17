interface IPlayerControlsProps {
    hit: () => void,
    stand: () => void,
    isPlayerTurn: boolean
}

const PlayerControls = ({ hit, stand, isPlayerTurn }: IPlayerControlsProps) => {
    return <div>
        <button disabled={!isPlayerTurn} onClick={hit}>Hit</button>
        <button disabled={!isPlayerTurn} onClick={stand}>Stand</button>
    </div>
}

export default PlayerControls