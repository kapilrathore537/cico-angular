
export class AssignmentChart{
    assignmentOption = {
        series: [
            {
              name: "Total Assignment",
              data: [44, 55, 57, 56, 61, 58,44, 55, 57, 56, 61, 58,44, 55, 57, 56, 61, 58,44, 55, 57, 56, 61, 58,44, 55, 57, 56, 61, 58],
              color:'#4d4dff'
            },
            {
              name: "Accepted",
              data: [76, 85, 101, 98, 87, 105,76, 85, 101, 98, 87, 105,76, 85, 101, 98, 87, 105,76, 85, 101, 98, 87, 105,76, 85, 101, 98, 87, 105,],
              color:'#66cc66'
            },
            {
              name: "Rejected",
              data: [76, 85, 101, 98, 87, 105,76, 85, 101, 98, 87, 105,76, 85, 101, 98, 87, 105,76, 85, 101, 98, 87, 105,76, 85, 101, 98, 87, 105,],
              color:'#ff4d4d'
            }
          ],
          chart: {
            type: "bar",
            height: 350,
            toolbar:false
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              endingShape: "rounded"
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
          },
          xaxis: {
            categories: [
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