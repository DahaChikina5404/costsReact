import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

function Costs({ expense }) {
  
    return (
        <div className="pt-6 text-xl flex gap-5 justify-between items-center border-b-2 border-solid border-indigo-200">
            <div className="flex flex-col gap-1">
                <p className="text-lg border-none bg-indigo-200 rounded-md">{format(new Date(), 'dd MMMM yyyy', {locale: ru})}</p>
                <p>{expense.title}</p>
            </div>
           
            <div className="flex gap-1">
                <p>-</p>
                <p>{expense.cost},00</p>
                <p>р.</p>
            </div>
        </div>
    )
}

export default Costs