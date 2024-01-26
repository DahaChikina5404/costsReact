function Button( { title }) {
    return (
        <button className="py-1 px-3 text-white bg-indigo-600 rounded hover:bg-indigo-800 transition-all duration-300">
            {title}
        </button>
    )
}
export default Button