import ApexChart from "react-apexcharts";

export default function BarChart({ entrada, saida, caixa }) {
  const formattedEntrada = parseFloat(entrada).toFixed(2);
  const formattedSaida = parseFloat(saida).toFixed(2);
  const formattedCaixa = parseFloat(caixa).toFixed(2);

  
  console.log(formattedSaida);
  console.log(formattedSaida);
  console.log(formattedCaixa);
  const state = {
    series: [
      {
        name: "Entrada",
        data: [formattedEntrada],
      },
      {
        name: "Saída",
        data: [formattedSaida],
      },
      {
        name: "Caixa",
        data: [formattedCaixa],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "25%",
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
