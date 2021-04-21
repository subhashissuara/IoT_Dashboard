import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import chartColors from "./chartColors";

function LDRValue() {
  return Math.random() * 10000;
}

function onRefresh(chart) {
  chart.config.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: LDRValue(),
    });
  });
}

const DataChart = ({ config }) => {
  return (
    <div className="data-chart">
      <Line
        data={{
          datasets: [
            {
              label: config.chartLabel,
              data: [],
              backgroundColor: chartColors.orange,
              borderColor: chartColors.red,
              borderWidth: 4,
            },
          ],
        }}
        height={300}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: config.xlabelString,
                },
                type: "realtime",
                realtime: {
                  duration: 30000,
                  refresh: 1000,
                  delay: 1000,
                  onRefresh: onRefresh,
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: config.ylabelString,
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
              },
            ],
          },
          tooltips: {
            mode: "nearest",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: false,
          },
        }}
      />
    </div>
  );
};

export default DataChart;
