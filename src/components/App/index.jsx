import ExpensesForm from "components/Form"
import Costs from "components/Costs"
import { useState } from "react"
import ExpensesChart from "components/Chart"
import ErrorModalWindow from "components/ErrorModal"
import Button from "components/Button"

function App() {

    const [expensesList, setExpensesList] = useState([]) // МАССИВ расходов пользователя
    const [errorModal, setErrorModal] = useState(false) // состояние ошибки
    const [selectedCategory, setSelectedCategory] = useState('all') // фильтр трат по категории

    // функция для добавления нового расхода (покупки) в список расходов
    const handleAddExpense = (expense) => {

        if (!expense.cost || expense.cost <= 0 || !expense.title) {
            setErrorModal(true)
            return
        } else {
            const expenseWithCat = {...expense, category: expense.title}
            setExpensesList(prevExpense => [...prevExpense, expenseWithCat].sort((a, b) => new Date(b.startDate) - new Date(a.startDate)))
        }
    }

    const closeModalError = () => {
        setErrorModal(false)
    }

    const calculateTotalExpense = () => {     // функция для общей суммы всех расходов
        return expensesList.reduce((sum, expense) => sum + parseFloat(expense.cost), 0)
    }
    
    const handleCategoryFilter = (category) => {  // обработчик для кнопки (фильтрация по категории)
        setSelectedCategory(category)
    }
    
    let filteredExpenses
      
    if (selectedCategory === 'all') {
        filteredExpenses = expensesList
    } else {
        filteredExpenses = expensesList.filter((expense) => expense.category === selectedCategory || !expense.category)
    }

    return (
        <div className="content md:w-1/2 bg-slate-100 rounded shadow-md">
            <h1 className="pb-10 text-center text-4xl font-semibold">Учёт расходов</h1>
            {errorModal && <ErrorModalWindow closeModalError={closeModalError} />}
            
            <ExpensesForm handleAddExpense={handleAddExpense} />
            <ExpensesChart expensesList={filteredExpenses} />

            <p className="my-5 text-xl md:text-2xl">Общая сумма расходов: {calculateTotalExpense()} руб.</p>

            <div className="my-5 flex flex-wrap flex-col md:flex-row justify-center md:items-center gap-2">
                <Button title="Все расходы" onClick={() => handleCategoryFilter('all')} />
                <Button title='Еда' onClick={() => handleCategoryFilter('Еда')} />
                <Button title='Одежда' onClick={() => handleCategoryFilter('Одежда')} />
                <Button title='Аренда' onClick={() => handleCategoryFilter('Аренда')} />
                <Button title='Образование' onClick={() => handleCategoryFilter('Образование')} />
                <Button title='Развлечения' onClick={() => handleCategoryFilter('Развлечения')} />
                <Button title='Путешествия' onClick={() => handleCategoryFilter('Путешествия')} />
            </div>

            {(selectedCategory === 'all' && filteredExpenses.length === 0) ? null : (
                filteredExpenses.length === 0 ? ( // условие если в выбранной категории нет трат
                    <p className="my-5 text-center text-lg md:text-xl text-indigo-600">Нет расходов в выбранной категории!</p>
                ) : (
                    filteredExpenses.map((expense, index) => {
                        return (
                            <Costs key={index} expense={expense} />
                        )
                    })
                ))}
        </div>
    )
}

export default App