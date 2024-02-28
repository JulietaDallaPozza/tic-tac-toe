


//square component should be in another file for best practices
export const Square = ({ children, isSelected, updateBoard, index }) => {

    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}