import { useEffect } from "react";
import { Chart } from "chart.js";

function BarChart({ regisData, candidateData, slotData, load }) {
  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    const providedLabels = [
      "OPMan",
      "Resman",
      "DB Staff",
      "NA Staff",
      "NA Officer",
      "RnD Staff",
      "RnD Officer",
      "Subco",
      "Subdev",
      "Astdev",
    ];
    const roles = [
      "Operations Officer",
      "ResMan Officer",
      "Database Administrator Staff",
      "Network Administrator Staff",
      "Network Administrator Officer",
      "Research and Development Staff",
      "Research and Development Officer",
      "Subject Coordinator",
      "Subject Development",
      "Assistant Development",
    ];
    const candidates = [
      "opofficer_count",
      "resmanoff_count",
      "astdev_count",
      "subco_count",
      "subdev_count",
      "dbstaff_count",
      "naofficer_count",
      "nastaff_count",
      "rndofficer_count",
      "rndstaff_count",
    ];

    if (
      regisData != undefined &&
      candidateData != undefined &&
      slotData != undefined
    ) {
      load(true);
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: providedLabels,
          datasets: [
            {
              data: Array.from(
                { length: providedLabels.length },
                (_, index) => {
                  const matchingData = regisData.find(
                    (item) => item.rolename === roles[index]
                  );
                  return matchingData ? parseInt(matchingData.count) : 0;
                }
              ),
              label: "Registrant",
              borderColor: "rgb(109, 253, 181)",
              backgroundColor: "rgb(109, 253, 181,0.5)",
              borderWidth: 2,
            },
            {
              data: candidates.map(
                (label) => parseInt(candidateData[label]) || 0
              ),
              label: "Candidates",
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192,0.5)",
              borderWidth: 2,
            },
            {
              data: Array.from(
                { length: providedLabels.length },
                (_, index) => {
                  const matchingData = slotData.find(
                    (item) => item.rolename === roles[index]
                  );
                  return matchingData ? parseInt(matchingData.available_slot) : 0;
                }
              ),
              label: "Slot",
              borderColor: "rgb(255, 205, 86)",
              backgroundColor: "rgb(255, 205, 86,0.5)",
              borderWidth: 2,
            },
          ],
        },
      });
    }
  }, [regisData, candidateData, slotData, load]);

  return (
    <>
      {/* Bar chart */}
      <div className="w-[1100px] h-fit flex felx-col justify-center">
        <div className="border border-gray-400 pt-0 rounded-xl  w-full my-auto">
          <canvas id="myChart" className="max-h-80"></canvas>
        </div>
      </div>
    </>
  );
}

export default BarChart;
