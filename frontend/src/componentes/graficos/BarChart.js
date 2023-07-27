import ApexChart from "react-apexcharts";

export default function BarChart({ entrada, saida, caixa }) {
  const state = {
    series: [
      {
        name: "Entrada",
        data: [entrada],
      },
      {
        name: "Saída",
        data: [saida],
      },
      {
        name: "Caixa",
        data: [caixa],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "5%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Valores"],
      },
      yaxis: {
        title: {
          text: "Valores",
        },
      },
      fill: {
        opacity: 1,
      },
      colors: ["#008000", "#800303fb", "#0099ff"], // Cores personalizadas para cada série
    },
  };

  return (
    <div id="barchart">
      <ApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={150} // Também definindo a altura como 200 aqui, apenas para garantir
      />
    </div>
  );
}
