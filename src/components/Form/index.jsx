import { useState } from "react"

function ExpensesForm({ handleAddExpense }) {

    const [cost, setCost] = useState('') // хранится введенная пользователем сумма расхода
    const [title, setTitle] = useState('Образование') // хранится выбранная категория

    // функция обрабатывает отправленную форму
    const handleSubmitForm = (event) => {
        event.preventDefault() // предотвращаем загрузку страницы при отправлении формы 

        const sale = {
            cost: parseFloat(cost),
            title
        }

        handleAddExpense(sale)

        //очистка формы
        setCost('')
        setTitle('Образование')
    }

    return (
        <form onSubmit={handleSubmitForm} className="flex gap-2 justify-between items-center">
            <input 
                className="pl-2 h-10 w-1/3 border border-solid border-slate-400 rounded"
                placeholder="00.00"
                name="cost"
                type="number"
                value={cost}
                onChange={(event) => setCost(event.target.value)}/>
        
            <select 
                className="pl-2 h-10 w-1/3 border border-solid border-slate-400 rounded"
                name="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}>
                    <option>Еда</option>
                    <option>Одежда</option>
                    <option>Аренда</option>
                    <option>Образование</option>
                    <option>Развлечения</option>
                    <option>Путешествия</option>
            </select> 
      
            <button 
                className="h-10 w-1/5 text-white bg-indigo-600 rounded p-1 hover:bg-indigo-800 transition-all duration-300" 
                type="submit"
            >
                Добавить
            </button>
        </form>
    )
}

export default ExpensesForm