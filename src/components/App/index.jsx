import ExpensesForm from "components/Form"
import Costs from "components/Costs"
import { useState } from "react"
import ExpensesChart from "components/Chart"
import ErrorModalWindow from "components/ErrorModal"


function App() {

    const [expensesList, setExpensesList] = useState([]) // здесь хранятся расходы пользователя
    const [errorModal, setErrorModal] = useState(false) // состояние ошибки

    // функция для добавления нового расхода (покупки) в список расходов
    const handleAddExpense = (expense) => {

        if (!expense.cost || expense.cost <= 0) {

            setErrorModal(true)
            return
        } else {
            setExpensesList(prevExpense => [...prevExpense, expense])
        }
    }

    const closeModalError = () => {
        setErrorModal(false)
    }

    // функция для общей суммы всех расходов

    const calculateTotalExpense = () => {

        return expensesList.reduce((sum, expense) => sum + parseFloat(expense.cost), 0)
    }

    return (
        <div className="content w-1/2 bg-slate-100 rounded shadow-md">
            <h1 className="pb-10 text-center text-4xl font-semibold">Учёт расходов</h1>
            {errorModal && <ErrorModalWindow closeModalError={closeModalError} />}
            <ExpensesForm handleAddExpense={handleAddExpense} />
            <ExpensesChart expensesList={expensesList} />
            
            <p className="my-3 text-2xl">Общая сумма расходов: {calculateTotalExpense()} руб.</p>
            {expensesList.map((expense, index) => {
                return (
                    <Costs key={index} expense={expense} />
                )
            })}

        </div>
    )
}

export default App