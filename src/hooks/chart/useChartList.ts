import { useLocalStorage } from "@hooks";
import React from "react";

/**
 * Creates a new chart object.
 *
 * @param props - Any props to create the chart with.
 *
 * @return The created chart.
 */
export function createNewChart(props?: Partial<Chart>): Chart {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: "",
    date: "",
    location: { name: "", latitude: "", longitude: "" },
    ...props || {},
  };
}

/**
 * Creates a hook for managing a list of saved charts.
 */
export default function useChartList(): ChartListHook {
  const [charts, setCharts] = useLocalStorage("charts", [createNewChart()]);
  const [currentChartIndex, setCurrentChartIndex] = React.useState(0);
  const currentChart = charts[currentChartIndex];

  return {
    charts,
    currentChartIndex,
    currentChart,
    saveCharts() {
      setCharts([...charts]);
    },
    createChart() {
      const newChart = createNewChart();

      setCurrentChartIndex(charts.length);
      setCharts([...charts, newChart]);
    },
    switchChart(index) {
      setCurrentChartIndex(index);
    },
    removeCurrentChart() {
      const remainingCharts = charts.filter(({ id }) => currentChart.id !== id);

      if (remainingCharts.length === 0) {
        const emptyChart = createNewChart();

        setCharts([emptyChart]);
        setCurrentChartIndex(0);
      } else {
        const newIndex = Math.max(0, currentChartIndex - 1);

        setCharts(remainingCharts);
        setCurrentChartIndex(newIndex);
      }
    },
  };
}
