import { useNavigate } from 'react-router-dom'

function SearchForm() {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        let id = e.target.searchField.value
        if (id === '') {
            document.getElementById("searchFieldError").classList.remove("hidden")
            console.log("df")
        } else {
            navigate("city/" + id)
        }
    }

    return (
        <div className='w-100 bg-transparent p-10 h-fit md:card'>
            <h1 className='text-6xl m-5 text-center md:float-left'>The Weather App 🌦️</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center mt-20 md:float-right w-5/6 p-2'>
                <label className='text-2xl'> Type in a city</label>
                <div className='card p-2 flex items-center h-20 mt-5'>
                    <img className='h-8 w-8 mr-2 ml-2' src={require('./images/search.png')} />
                    <input id="searchField" className='border-0 outline-0 bg-transparent text-3xl' />
                </div>
                <h1 id="searchFieldError" className='text-red-600 mt-3 hidden' style={{ "fontFamily": "serif" }}>This field is requird</h1>
                <div className='mt-5 card p-2 w-32 flex bg-teal-400'>
                    <input type='submit' className='text-xl w-3/4' value="Find" />
                    <img className='h-8 w-8 ml-2 bg-transparent' src={require('./images/go.gif')} />
                </div>
            </form>
        </div>
    )
}

export default SearchForm
