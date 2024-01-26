import ExpensesForm from "components/Form"
import Costs from "components/Costs"
import { useState } from "react"
import ExpensesChart from "components/Chart"
import ErrorModalWindow from "components/ErrorModal"
import Button from "components/Button"


function App() {

    const [expensesList, setExpensesList] = useState([]) // МАССИВ расходов пользователя
    const [errorModal, setErrorModal] = useState(false) // состояние ошибки
    // const [filter, setFilter] = useState() // фильтр трат

    // функция для добавления нового расхода (покупки) в список расходов
    const handleAddExpense = (expense) => {

        if (!expense.cost || expense.cost <= 0) {
            setErrorModal(true)
            return
        } else {
            setExpensesList(prevExpense => [...prevExpense, expense].sort((a, b) => new Date(a.startDate) - new Date(b.startDate)))
        }
    }

    const closeModalError = () => {
        setErrorModal(false)
    }

    const calculateTotalExpense = () => {     // функция для общей суммы всех расходов
        return expensesList.reduce((sum, expense) => sum + parseFloat(expense.cost), 0)
    }
    
    
    //const categoryFilter = expensesList.filter
   // expensesList.map //мы получили масссив трат и можем теперь их фильтровать!!!
      
    // function categoryFilter(currentCategory) { // Фильтр по категормм
    //     if (currentCategory === 'all') {
    //         setFilter(expenses)
    //     } else {
    //         const newCategory = [...expenses].filter((expense) => {
    //             return expense.category === category
    //         })
    //         setFilter(newCategory)
    //     }
    // }


    return (
        <div className="content w-1/2 bg-slate-100 rounded shadow-md">
            <h1 className="pb-10 text-center text-4xl font-semibold">Учёт расходов</h1>
            {errorModal && <ErrorModalWindow closeModalError={closeModalError} />}
            
            <ExpensesForm handleAddExpense={handleAddExpense} />
            <ExpensesChart expensesList={expensesList} />

            <p className="my-5 text-xl md:text-2xl">Общая сумма расходов: {calculateTotalExpense()} руб.</p>

            <div className="flex flex-wrap flex-col md:flex-row justify-center md:items-center gap-2">
                <Button title="Все расходы" data-category="all"/>
                <Button title="Еда" data-category="Еда"/>
                <Button title="Одежда" data-category="Одежда"/>
                <Button title="Аренда" data-category="Аренда"/>
                <Button title="Образование" data-category="Образование"/>
                <Button title="Развлечения" data-category="Развлечения"/>
                <Button title="Путешествия" data-category="Путешествия"/>
            </div>

            {expensesList.map((expense, index) => {
                return (
                    <Costs key={index} expense={expense} />
                )
            })}
        </div>
    )
}

export default App