export class BarChart {
    chartOptions = {
        series: [
          {
            name: "Student",
            data: []
          }
        ],
        chart: {
          type: "bar",
          height: 350,
          toolbar:{show:false}
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        colors: ['#49bfcf']
      };
}
