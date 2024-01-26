import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts"
import './styles.css'

const COLORS = ['#2563EB', '#22C55E', '#FDE048', '#B45309', '#DC2626', '#6366F1']

function ExpensesChart({ expensesList }) {

    const totalByCategory = {} // пустой объект для хранения общей суммы по каждой категории

    const defaultData = [
        { name: 'Еда', value: 0 },
        { name: 'Одежда', value: 0 },
        { name: 'Аренда', value: 0 },
        { name: 'Образование', value: 0 },
        { name: 'Развлечения', value: 0 },
        { name: 'Путешествия', value: 0 }
    ]

    // цикл для подсчета общей суммы каждой категории

    for (let expense of expensesList) {

        const expenseCategory = expense.title //здесь хранится заголовок категории
        const cost = parseFloat(expense.cost) // здесь хранится сумма расхода, которую ввел пользователь

        // если в объекте для хранения общей суммы по категории уже есть сумма разхода по текущей категории, 
        //то к предыдущей суммме мы добавляем текущую

        if (totalByCategory[expenseCategory]) {

            totalByCategory[expenseCategory] += cost
        } else {

            totalByCategory[expenseCategory] = cost
        }
    }

    // преобразование массива данных, заменяем значеня value у категории на реальные, которые ввел user

    const dataOfUser = defaultData.map(defaultItem => {

        const categoryName = defaultItem.name
        const totalValueForCategory = totalByCategory[categoryName] || 0

        return {
            ...defaultItem, 
            value: totalValueForCategory
        }
    })
    

    return (
        <div className="flex items-center">
            {expensesList.length === 0 ? (
                <div className="mt-4">
                    <p className="text-xl">Здесь появится Ваша диаграмма расходов</p>
                    <img className="mt-2 mb-2" src="/chart.jpeg" alt="Диаграмма"/>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-2 justify-end md:items-center">
                    <>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={dataOfUser}
                                cx={200}
                                cy={200}
                                labelLine={false}
                                outerRadius={100}
                                fill='#8884d8'
                                dataKey="value"
                            >
                                {dataOfUser.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>

                        <div className="recharts-legend-wrapper w-1/2">
                            <Legend 
                                align="right"
                                verticalAlign="middle"
                                layout="vertical"
                                wrapperStyle={{ right: 10, top: 0, bottom: 0 }}
                                payload={dataOfUser.map((category, index) => ({
                                    id: category.name,
                                    type: "rect",
                                    value: `${category.name} - ${dataOfUser[index].value}`,
                                    color: COLORS[index % COLORS.length]
                                }))}
                            />
                        </div>
                    </>
                </div>
            )}
        </div> 
    )
}

export default ExpensesChart