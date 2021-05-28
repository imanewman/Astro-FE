import { useLocalStorage } from "@hooks";
import React from "react";
import { createNewChart } from "@models";

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
    createChart(chart?: Chart) {
      setCurrentChartIndex(charts.length);
      setCharts([...charts, chart || createNewChart()]);
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
