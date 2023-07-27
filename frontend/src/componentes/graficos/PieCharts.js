import ApexChart from "react-apexcharts";

export default function PieChart({ entrada, saida, caixa }) {
  const state = {
    series: [entrada, saida, caixa],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Entrada", "Saída", "Caixa"],
      colors: ["#008000", "#800303fb", "#0099ff"], // Cores personalizadas para cada série
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div id="chart">
      <ApexChart
        options={state.options}
        series={state.series}
        type="pie"
        width={380}
      />
    </div>
  );
}
