// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";

export interface ColumnSettings<TData> {
    title: string;
    render: (data: TData) => JSX.Element;
    compareFunction?: (a: TData, b: TData) => number
}

interface Props<TData> {
    settings: Array<ColumnSettings<TData>>;
    data: Array<TData>;
}

interface State<TData> {
    sortColumn?: ColumnSettings<TData>;
    sortDirection: SortDirection;
}

enum SortDirection {
    Ascending = 1,
    Descending = -1
}

export class DataTable<TData> extends React.Component<Props<TData>, State<TData>> {
    constructor() {
        super();
        this.state = {
            sortColumn: null,
            sortDirection: SortDirection.Ascending
        };
    }

    private sortedData(): Array<TData> {
        const compareFunction = (a, b) => this.state.sortColumn.compareFunction(a, b) * this.state.sortDirection;
        return this.state.sortColumn && this.state.sortColumn.compareFunction
            ? this.props.data.slice().sort(compareFunction)
            : this.props.data
    }

    setSortColumn(column: ColumnSettings<TData>) {
        var sortDirection: SortDirection;
        if (column == this.state.sortColumn) {
            // This column is already selected, so toggle the direction
            sortDirection = this.state.sortDirection == SortDirection.Ascending
                ? SortDirection.Descending
                : SortDirection.Ascending;
        } else {
            // Selecting a new column, so use ascending direction
            sortDirection = SortDirection.Ascending;
        }
        this.setState({ sortColumn: column, sortDirection: sortDirection });
    }

    private renderHeader(column: ColumnSettings<TData>): JSX.Element {
        return <td onClick={() => this.setSortColumn(column) }>{ column.title }</td >;
    }

    render() {
        var headers = this.props.settings.map(column => this.renderHeader(column));
        var rows = this.sortedData().map(row => {
            var cells = this.props.settings.map(column => {
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