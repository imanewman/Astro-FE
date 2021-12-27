import { useLocalStorage } from "@hooks";
import React from "react";
import { createNewChart } from "@models";

/**
 * Creates a hook for managing a list of saved charts.
 */
export default function useChartList(): ChartListHook {
  const [charts, setCharts] = useLocalStorage("charts", [createNewChart()]);
  const [currentChartIndex, setCurrentChartIndex] = React.useState(0);
  const [currentChart, setCurrentChart] = React.useState(charts[currentChartIndex]);

  return {
    charts,
    currentChartIndex,
    currentChart,
    saveCharts() {
      setCharts([...charts]);
    },
    createChart(chart: EventModel = createNewChart()) {
      setCurrentChartIndex(charts.length);
      setCharts([...charts, chart]);
      setCurrentChart(chart);
    },
    updateChart(chart) {
      charts[currentChartIndex] = chart;
      setCurrentChart(chart);
    },
    switchChart(index) {
      setCurrentChartIndex(index);
      setCurrentChart(charts[index]);
    },
    removeCurrentChart() {
      const remainingCharts = charts.filter(({ id }) => currentChart.id !== id);

      if (remainingCharts.length === 0) {
        const emptyChart = createNewChart();

        setCharts([emptyChart]);
        setCurrentChartIndex(0);
        setCurrentChart(emptyChart);
      } else {
        const newIndex = Math.max(0, currentChartIndex - 1);

        setCharts(remainingCharts);
        setCurrentChartIndex(newIndex);
        setCurrentChart(remainingCharts[newIndex]);
      }
    },
  };
}
