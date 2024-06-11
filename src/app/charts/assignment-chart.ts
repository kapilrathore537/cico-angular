export class AssignmentChart{
    assignmentOption = {
        series: [
            {
              name: "Total Assignment",
              data: [44, 55, 57, 56, 61, 58,],
              color:'#00008B'
            },
            {
              name: "Accepted",
              data: [76, 85, 101, 98, 87, 105,],
              color:'#17A40A'
            },
            {
              name: "Rejected",
              data: [35, 41, 36, 26, 45, 48],
              color:'#DC0707'
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
            width: 1,
            colors: ["#000"],
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
            opacity: 1,
            colors:["#00008B", "#17A40A", "#DC0707"]
          },
          tooltip: {
            y: {
              formatter: function(val:any) {
                return  val ;
              }
            }
          }
        };
}