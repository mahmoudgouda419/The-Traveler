import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface TrendChartProps {
    isDecrement: boolean;
}

const TrendChart = ({ isDecrement }: TrendChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const color = isDecrement ? "#ff543d" : "#12b76a";
        const bgColor = isDecrement
            ? "rgba(255,84,61,0.08)"
            : "rgba(18,183,106,0.10)";
        const data = isDecrement
            ? [9, 7, 8, 6.5, 7.5, 5.5, 6, 4.5]
            : [4, 5, 4.5, 6, 5.5, 7, 7.5, 9];

        chartRef.current = new Chart(canvasRef.current, {
            type: "line",
            data: {
                labels: data.map((_, i) => i),
                datasets: [
                    {
                        data,
                        borderColor: color,
                        borderWidth: 2,
                        backgroundColor: bgColor,
                        fill: true,
                        tension: 0.45,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                },
                scales: {
                    x: { display: false },
                    y: { display: false },
                },
                animation: false,
                layout: { padding: 2 },
            },
        });

        return () => {
            chartRef.current?.destroy();
        };
    }, [isDecrement]);

    return (
        <div className="w-[100px] h-[52px] shrink-0">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default TrendChart;