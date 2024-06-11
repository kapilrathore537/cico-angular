export class NormalExamBar{
    normalTestResult = {
            series: [50, 50],
            chart: {
              width: 320,
              type: "donut",
              toolbar: {
                show: false // Hide the default toolbar
              }
            },
            colors: ["#00008B","#17A40A"],
      
            labels: ["Total Test","Test Completed"],
            legend: {
              position: "bottom", // Show the legend at the bottom
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

export class ScheduleExamBar{
    scheduleTestResult = {
            series: [50, 50],
            chart: {
              width: 320,
              type: "donut",
              toolbar: {
                show: false // Hide the default toolbar
              }
            },
            colors: ["#00008B","#17A40A"],
      
            labels: ["Total Schedule Test","Schedule Test Completed"],
            legend: {
              position: "bottom", // Show the legend at the bottom
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