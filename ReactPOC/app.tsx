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
            render: (data: BusStop) => <span>{data.id}</span>
        },
        {
            title: "Stop Name",
            render: renderStopName
        }
    ];
    ReactDOM.render(<BusDataTable settings={settings} data={testData} />, root);
};