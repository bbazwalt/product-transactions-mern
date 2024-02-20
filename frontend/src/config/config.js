export const barChartOptions = {
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        drawBorder: true,
        display: true,
        drawOnChartArea: false,
      },
      ticks: {
        font: {
          weight: "bold",
          size: 16,
        },
      },
      title: {
        display: true,
        text: "Price Ranges",
        padding: {
          top: 20,
        },
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    y: {
      beginAtZero: true,

      ticks: {
        stepSize: 1,
        precision: 0,
        font: {
          size: 16,
          weight: "bold",
        },
      },
      title: {
        font: {
          size: 16,
          weight: "bold",
        },
        display: true,
        text: "Number of Items",

        padding: {
          bottom: 20,
        },
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    datalabels: {
      anchor: "center",
      align: "center",
      offset: 4,
      color: "#000",
      font: {
        weight: "bold",
        size: 16,
      },
      formatter: (value) => {
        return value === 0 ? "" : value.toLocaleString();
      },
    },
  },
};

export const getPieChartOptions = (activeIndex, setActiveIndex) => {
  return {
    plugins: {
      datalabels: {
        anchor: "center",
        align: "center",
        offset: -10,
        font: {
          size: 16,
          weight: "bold",
        },
        formatter: (value) => {
          return value;
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (acc, cur) => acc + cur,
              0
            );
            const percentage =
              ((context.parsed / total) * 100).toFixed(2) + "%";
            return percentage;
          },
        },
        bodyFont: {
          size: 18,
          weight: "bold",
        },
        displayColors: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };
};
