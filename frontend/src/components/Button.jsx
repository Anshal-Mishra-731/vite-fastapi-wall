function Button ({
    children,
    type = "button",
    bgColor = "black",
    textColor = "white",
    className = '',
    ...props
}) {
    return (
        <button type={type} className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>
            {children}
        </button>
    )
}

export default Button;