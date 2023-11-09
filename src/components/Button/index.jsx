function Button(props) {
    const { title } = props

    return (
        <button className="px-2 py-2 bg-green-700 hover:bg-green-900 text-white rounded-lg shadow-md">
            {title}
        </button>
    )
}
export default Button