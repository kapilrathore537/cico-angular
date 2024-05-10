export class DonutChart {
    chartOptions = {
        series: [75, 20, 5,6],
        chart: {
          width: 320,
          type: "donut",
          toolbar: {
            show: false // Hide the default toolbar
          }
        },
        colors: ["#5754E5", "#FF4A11", "#F8961E", "#88048f", "#10e317"],
  
        labels: ["Present", "Absent", "Leaves","Mispunch","EarlyCheckOut"],
        legend: {
          position: "bottom", // Show the legend at the bottom
  
          // formatter: function (seriesName:any, opts:any) {
          //   const total = opts.w.globals.seriesTotals.reduce((a:any, b:any) => a + b, 0);
          //   const percent = ((opts.w.globals.series[opts.seriesIndex] / total) * 100).toFixed(2);
          //   return seriesName + ": " + percent + "%";
          //}
        },
        stroke: {
          show: false // Set this to false to remove the borders between the series
        },
        responsive: [
  
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 280
  
  
              },
              legend: {
                position: 'bottom'
  
              }
            }
          }
        ]
      };
}
