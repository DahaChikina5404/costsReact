import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

function Costs({ expense }) {

    const formatDate = new Date(expense.startDate)
  
    return (
        <div className="pt-6 text-sm md:text-xl flex gap-5 justify-between items-center border-b-2 border-solid border-indigo-200">
            <div className="flex flex-col gap-1">
                <p className="text-sm md:text-lg border-none bg-indigo-200 rounded-md">{format(formatDate, 'dd MMMM yyyy', {locale: ru})}</p>
                <p>{expense.title}</p>
            </div>
           
            <p>
                - <span>{expense.cost},00</span> р.
            </p>
        </div>
    )
}

export default Costs