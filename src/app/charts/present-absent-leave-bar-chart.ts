export class PresentAbsentLeaveBarChart {
  attendanceOptions = {
        series: [
          {
            data: [],
            name: "Present",
          },
          {
            name: "Absent",
            data: []
          },
          {
            name: "Leave",
            data: []
          },
          {
            name: "mispunch",
            data: []
          }
          , {
            name: "earlyCheckOut",
            data: []
          }
        ],
        chart: {
          type: "bar",
          height: 334,
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
        colors: ["#5754E5", "#FF4A11", "#F8961E", "#88048f", "#10e317"],
      };
  
}
