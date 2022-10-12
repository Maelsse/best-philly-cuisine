//====================================================================================================
// Gauge Chart for Belly Button Biodiversity data
// © 2022 Rosie Gianan
//====================================================================================================
function chartGauge(data_metadata, subject_id) {
    console.log("chartGauge subject_id   :", subject_id);
    console.log("chartGauge data_metadata:", data_metadata);

    // Filter the metadata for the subject_id
    let data_gauge_by_id = data_metadata.filter(
        (subject_element) => subject_element.id == subject_id
    );
    console.log("data_gauge_by_id: ", data_gauge_by_id);

    // Save the metadata object
    let data_gauge = data_gauge_by_id[0];
    console.log("data_gauge          : ", data_gauge);

    // Save the gauge chart data and attibutes
    var trace3 = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: parseFloat(data_gauge.wfreq),
            title: { text: "Belly Button Washing Frequency<BR> <sup>Scrubs per Week</sup>" },
            type: "indicator",
            mode: "gauge+number+delta",
            delta: { 'reference': 0 },
            gauge: {
                axis: { range: [null, 9] },
                steps: [
                    { range: [0, 1], color: "rgb(230, 255, 230)" },
                    { range: [1, 2], color: "rgb(200, 240, 200)" },
                    { range: [2, 3], color: "rgb(180, 225, 180)" },
                    { range: [3, 4], color: "rgb(160, 210, 160)" },
                    { range: [4, 5], color: "rgb(140, 195, 140)" },
                    { range: [5, 6], color: "rgb(120, 180, 120)" },
                    { range: [6, 7], color: "rgb(100, 165, 100)" },
                    { range: [7, 8], color: "rgb(080, 150, 080)" },
                    { range: [8, 9], color: "rgb(060, 135, 060)" }
                ]
            }
        }
    ];

    // Set the gauge chart layout
    var layout3 = {
        width: 500,
        height: 300,
        margin: { t: 100, b: 30, l: 100, r: 100 }
    };

    // Plot the gauge chart
    Plotly.newPlot("gauge", trace3, layout3);
};
// © 2022 Rosie Gianan ===============================================================================







