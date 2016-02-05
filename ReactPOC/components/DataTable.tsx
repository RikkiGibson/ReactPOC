// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";

export interface ColumnSettings<TData> {
    title: string;
    render: (data: TData) => JSX.Element;
}

interface Props<TData> {
    settings: Array<ColumnSettings<TData>>;
    data: Array<any>;
}

interface State {
}

export class DataTable<TData> extends React.Component<Props<TData>, State> {
    render() {
        const headers = this.props.settings.map(column => <td>{column.title}</td>);
        const rows = this.props.data.map(row => {
            const cells = this.props.settings.map(column => {
                return <td>{column.render(row)}</td>
            });
            return <tr>{cells}</tr>;
        });
        return (
            <table>
            <thead>
                <tr>
                    {headers}
                    </tr>
                </thead>
            <tbody>
                {rows}
                </tbody>
                </table>
        );
    }
}