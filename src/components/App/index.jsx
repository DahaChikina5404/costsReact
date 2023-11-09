import Header from "components/Header"
import Shop from "components/Shop"
import Footer from "components/Footer"
import { useState } from "react"

function App() {
    
    const [shops, setShops] = useState([
        {
            id: 1,
            title: 'Молоко',
            status: 'Добавлено!'
        },
        {
            id: 2,
            title: 'Хлеб',
            status: 'Добавлено!'
        },
        {
            id: 3,
            title: 'Шоколад',
            status: 'Добавлено!'
        },
        {
            id: 4,
            title: 'Яйца',
            status: 'Добавлено!'
        },
        {
            id: 5,
            title: 'Апельсины',
            status: 'Добавлено!'
        },
    ])

    const deleteShop = (id) => {
        const filteredShops = shops.filter(shop => shop.id !== id)
        setShops(filteredShops)
    }
 
    return (
        <div>
            <Header />
            <div className="mx-10 min-h-screen">
                {shops.length === 0 && (<div className="mt-20 text-center text-6xl text-gray-400 font-thin">Список покупок пуст</div>)}
                {shops.length > 0 && shops.map((shop) => {
                    return (
                        <Shop key={shop.id} shop={shop} deleteShop={deleteShop} />
                    )
                })}
            </div>
            <Footer />
        </div>
    )
}

export default App