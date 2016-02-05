import "es5-shim";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { testData, BusStop } from "./testData";
import { DataTable, ColumnSettings } from "./components/DataTable";

function renderStopName(busStop: BusStop): JSX.Element {
    return <span style={{ "backgroundColor": "red" }}>{busStop.name}</span>;
}

class BusDataTable extends DataTable<BusStop> { }
window.onload = () => {
    var root = document.getElementById('content');
    var settings: Array<ColumnSettings<BusStop>> = [
        {
            title: "Stop ID",
            render: (data: BusStop) => <span>{data.id}</span>,
            compareFunction: (a: BusStop, b: BusStop) => a.id - b.id
        },
        {
            title: "Stop Name",
            render: renderStopName,
            compareFunction: (a: BusStop, b: BusStop) => a.name.localeCompare(b.name)
        },
        {
            title: "Latitude",
            render: (data: BusStop) => <span>{data.lat}</span>,
            compareFunction: (a: BusStop, b: BusStop) => a.lat - b.lat
        },
        {
            title: "Longitude",
            render: (data: BusStop) => <span>{data.lng}</span>,
            compareFunction: (a: BusStop, b: BusStop) => a.lng - b.lng
        }
    ];
    ReactDOM.render(<BusDataTable settings={settings} data={testData} />, root);
};