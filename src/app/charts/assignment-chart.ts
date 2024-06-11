export class AssignmentChart{
    assignmentOption = {
        series: [
            {
              name: "Net Profit",
              data: [44, 55, 57, 56, 61, 58,]
            },
            {
              name: "Revenue",
              data: [76, 85, 101, 98, 87, 105,]
            },
            {
              name: "Free Cash Flow",
              data: [35, 41, 36, 26, 45, 48]
            }
          ],
          chart: {
            type: "bar",
            height: 350,
            toolbar: {
                show: false  // This will remove the toolbar
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "80%",
              endingShape: "rounded"
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 5,
            colors: ["transparent"]
          },
          xaxis: {
            categories: [
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ]
          },
          yaxis: {
            show: false 
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function(val:any) {
                return "$ " + val + " thousands";
              }
            }
          }
        };
}