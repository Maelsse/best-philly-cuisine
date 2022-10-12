//====================================================================================================
// Plot the Belly Button Biodiversity data
// © 2022 Rosie Gianan
//====================================================================================================
// Save the url for samples.json file
const url_samples_data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//====================================================================================================
// demographicsInfo() - Display the demographic data for a subject_id 
//====================================================================================================
function demographicsInfo(data_metadata, subject_id) {
    console.log("demographicsInfo subject_id   :", subject_id);
    console.log("demographicsInfo data_metadata:", data_metadata);

    // Filter the the metadata for the subject_id
    let data_demographic_by_id = data_metadata.filter(
        (subject_element) => subject_element.id == subject_id
    );
    console.log("data_demographic_by_id : ", data_demographic_by_id);

    // Save the metadata object
    let data_demographic = data_demographic_by_id[0];
    console.log("data_demographic       : ", data_demographic);

    // select the demographic Info area 
    let demographicData = d3.select("#sample-metadata");

    // initialize the demographic Info area 
    demographicData.html("");

    // Display the demographic key-value pair into demographic Info area 
    Object.entries(data_demographic).forEach(([key, value]) => {
        console.log(key, " : ", value);

        // add demographicData to html
        demographicData.append("h5").text(key + ": " + value);
    });
};

//====================================================================================================
// chartBar() - Plot the Bar chart for the Top 10 OTUs data for a subject id 
//====================================================================================================
function chartBar(data_samples, subject_id) {
    console.log("ChartBar subject_id  :", subject_id);
    console.log("ChartBar data_samples:", data_samples);

    // Filter the data.samples for the subject_id
    let data_samples_by_id = data_samples.filter(
        (subject_element) => subject_element.id == subject_id
    );
    console.log("data_samples_by_id : ", data_samples_by_id);

    // Save data.samples data object
    let data_chart = data_samples_by_id[0];
    console.log("data_chart     : ", data_chart);

    // Save the top ten samples_value, sorted in descending order
    let top10_sample_values = data_chart.sample_values.slice(0, 10).reverse();
    console.log("top10_sample_values: ", top10_sample_values);

    // Save the top ten otu_ids, sorted in descending order
    let top10_otu_ids = data_chart.otu_ids.slice(0, 10).reverse();

    // Format the top 10 otu_ids per preferred plotting format
    top10_otu_ids = top10_otu_ids.map(id => "OTU " + id);
    console.log("top10_otu_ids      : ", top10_otu_ids);

    // Save the top ten otu_labels
    let top10_otu_labels = data_chart.otu_labels.slice(0, 10);
    console.log("top10_otu_labels      : ", top10_otu_labels);

    // Save the bar chart data and attibutes
    let trace1 = {
        x: top10_sample_values,
        y: top10_otu_ids,
        text: top10_otu_labels,
        type: "bar",
        orientation: "h"
    };

    var data = [trace1];

    // Set the bar chart layout
    let layout = {
        title: "Top 10 OTUs found in an individual (Subject ID " + subject_id + ")",
        barmode: "group",
        // Include margins in the layout so the x-tick labels display correctly
        margin: {
            l: 100,
            r: 100,
            b: 30,
            t: 50
        }
    };

    // Plot the bar chart 
    Plotly.newPlot("bar", data, layout);
};

//====================================================================================================
// chartBubble() - Plot the Bubble chart for each sample data for a subject id 
//====================================================================================================
function chartBubble(data_samples, subject_id) {
    console.log("ChartBubble subject_id  :", subject_id);
    console.log("ChartBubble data_samples:", data_samples);

    // Filter the data.samples for the subject_id
    let data_samples_by_id = data_samples.filter(
        (subject_element) => subject_element.id == subject_id
    );
    console.log("data_samples_by_id : ", data_samples_by_id);

    // Save data.samples data object
    let data_chart = data_samples_by_id[0];
    console.log("data_chart         : ", data_chart);

    // Save the bubble chart data and attibutes
    let trace2 = {
        x: data_chart.otu_ids,
        y: data_chart.sample_values,
        mode: "markers",
        marker: {
            size: data_chart.sample_values,
            color: data_chart.otu_ids
        },
        text: data_chart.otu_labels
    };

    var data2 = [trace2];

    // Set the bubble chart layout
    let layout2 = {
        xaxis: { title: "OTU ID" },
        height: 550,
        width: 1000
    };

    // Plot the bubble chart 
    Plotly.newPlot("bubble", data2, layout2);
};

//====================================================================================================
// optionChanged() - Plot the charts for the selected subject id 
//====================================================================================================
function optionChanged(subject_id) {

    // Fetch the JSON data from samples.json file and save in an object name data
    d3.json(url_samples_data).then(function (data) {
        console.log(data);

        // save the names, metadata and samples from data object
        let data_names = Object.values(data.names);
        let data_metadata = Object.values(data.metadata);
        let data_samples = Object.values(data.samples);

        //log the names,  metadata and samples from data object
        console.log("optionChanged data_names   : ", data_names);
        console.log("optionChanged data_metadata: ", data_metadata);
        console.log("optionChanged data_samples : ", data_samples);

        //------------------------------------------------------------------------------------------------
        // Plot the data for the selected subject id's
        //------------------------------------------------------------------------------------------------
        console.log("optionChanged  subject_id:", subject_id);

        // Plot the demographics Info data for the selected subject_id
        demographicsInfo(data_metadata, subject_id);

        // Plot the bar chart for the Top 10 OTUs for the selected subject_id
        chartBar(data_samples, subject_id);

        // Plot the Bubble chart for each sample for the selected subject_id
        chartBubble(data_samples, subject_id);

        // Plot the gauge chart for the weekly Washing Frequency the selected subject_id
        chartGauge(data_metadata, subject_id);
    });
};

//====================================================================================================
// init() - Populate the drop down menu and plot the charts using the first data.names as the 
//          initial subject id 
//====================================================================================================
function init() {

    // Fetch the JSON data from samples.json file and save in an object name data
    d3.json(url_samples_data).then(function (data) {
        console.log(data);

        // save the names, metadata and samples from data object
        let data_names = Object.values(data.names);
        let data_metadata = Object.values(data.metadata);
        let data_samples = Object.values(data.samples);

        //log the names,  metadata and samples from data object
        console.log("init data_names   : ", data_names);
        console.log("init data_metadata: ", data_metadata);
        console.log("init data_samples : ", data_samples);

        //------------------------------------------------------------------------------------------------
        // Populate the dropdownMenu with list of subject id's 
        //------------------------------------------------------------------------------------------------

        // select the dropdown menu area
        let dropdownMenu = d3.select("#selDataset");

        // populate the dropdownMenu with data.names value
        for (let name of data_names) {
            dropdownMenu.append('option').text(name);
        };

        //------------------------------------------------------------------------------------------------
        // Plot the initial data for first data.names as the initial subject id's
        //------------------------------------------------------------------------------------------------

        // Save the first data.names as the initial subject_id 
        let initial_subject_id = data_names[0];
        console.log("initial_subject_id: ", initial_subject_id);

        // Plot the demographics Info data for the initial subject_id
        demographicsInfo(data_metadata, initial_subject_id);

        // Plot the bar chart for the Top 10 OTUs for the initial subject_id
        chartBar(data_samples, initial_subject_id);

        // Plot the Bubble chart for each sample for the initial subject_id
        chartBubble(data_samples, initial_subject_id);

        // Plot the gauge chart for the weekly Washing Frequency the initial subject_id
        chartGauge(data_metadata, initial_subject_id);
    });
};

//----------------------------------------------------------------------------------------------------
init();
//----------------------------------------------------------------------------------------------------

// © 2022 Rosie Gianan ===============================================================================







