import {calculateTrendPercentage, cn} from "../lib/utils";
import TrendChart from "./TrendChart";
const StatsCard = ({
    headerTitle, total, lastMonthCount, currentMonthCount
                   }:StatsCard) => {
    const { trend, percentage } = calculateTrendPercentage(currentMonthCount, lastMonthCount);
    const isDecrement = trend === 'decrement';

    return (
        <article className="stats-card">
            <h3 className="text-base font-medium">
                {headerTitle}
            </h3>

            <div className="content">
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl font-semibold">{total}</h2>

                    <div className="flex items-center gap-2">
                        <figure className="flex items-center gap-1">
                            <img
                                src={`/assets/icons/${isDecrement ? 'arrow-down-red.svg' : 'arrow-up-green.svg'}`} className="size-5" alt="arrow"
                            />
                            <figcaption className={cn('text-sm font-medium', isDecrement ? 'text-red-500' : 'text-success-700')}>
                                {Math.round(percentage)}%
                            </figcaption>
                        </figure>
                        <p className="text-sm font-medium text-gray-100 truncate">vs last month</p>
                    </div>
                </div>

                <div className="shrink-0 flex items-end">
                    <TrendChart isDecrement={isDecrement} />
                </div>
            </div>
        </article>

    )
}
export default StatsCard
