import "es5-shim";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { testData, BusStop } from "./testData";
import DataGrid = require('react-datagrid');
import 'react-datagrid/index.css';
import { Router, Route, Link, hashHistory } from 'react-router';

class App extends React.Component<any, any> {
    render() {
        return <div>
            <ul>
                <li><Link to="/lol">Lol</Link></li>
                <li><Link to="/bbq">BBQ</Link></li>
            </ul>
            {this.props.children}
        </div>
    }
}

class MyLol extends React.Component<any, any> {
    onColumnResize(firstCol: ReactDataGrid.Column, firstSize: number,
            secondCol: ReactDataGrid.Column, secondSize: number) {
        firstCol.width = firstSize;
        this.setState({});
    }

    columns: Array<ReactDataGrid.Column> = [
        { name: 'id', title: 'Stop ID' },
        { name: 'name', title: 'Stop Name' },
        { name: 'lat', title: 'Latitude' },
        { name: 'lng', title: 'Longitude' }
    ];

    render() {
        return <DataGrid
            idProperty="id"
            dataSource={testData}
            columns={this.columns}
            onColumnResize={this.onColumnResize.bind(this)}
        />
    }
}

class MyBBQ extends React.Component<any, any> {
    render() {
        return <span>You are at my barbecue.</span>
    }
}

window.onload = () => {
    var root = document.getElementById('content');
    var routes: JSX.Element =
        <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <Route path="lol" component={MyLol} />
                    <Route path="bbq" component={MyBBQ} />
                </Route>
        </Router>;
    ReactDOM.render(routes, root);
    
};