
type BadgeProps = {
    children: JSX.Element
    number?: number
}

const Badge = ({ children, number }: BadgeProps) => {

    if (number) return (
        <div className="badge-container">
            <span className="badge">{number}</span>
            {children}
        </div>
    )
    else return (
        <div className="badge-container">
            {children}
        </div>
    )
}

export default Badge
