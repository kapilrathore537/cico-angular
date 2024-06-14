export class BarChart {
    chartOptions = {
        series: [
          {
            name: "Student",
            data: [1,2,3,4,5,6,7,8,9,10,11,12]
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
