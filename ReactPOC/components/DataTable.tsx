// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import "es6-shim";

export interface ColumnSettings<TData> {
    title: string;
    render: (data: TData) => JSX.Element;
    compareFunction?: (a: TData, b: TData) => number;
}

interface Props<TData> {
    settings: Array<ColumnSettings<TData>>;
    data: Array<TData>;
}

interface State<TData> {
    sort: Array<ColumnSortState<TData>>
}

enum SortDirection {
    Ascending = 1,
    Descending = -1
}

interface ColumnSortState<TData> {
    columnTitle: string;
    compareFunction: (a: TData, b: TData) => number;
    sortDirection: SortDirection;
}

// assure typescript that this method exists
declare class Object { static assign<T>(obj: Object, other: T): T }

export class DataTable<TData> extends React.Component<Props<TData>, State<TData>> {
    constructor() {
        super();
        this.state = {
            sort: []
        };
    }

    compare(a: TData, b: TData): number {
        if (this.state.sort.length == 0) {
            return 0;
        }
        var comparison: number;
        for (var sortState of this.state.sort) {
            comparison = sortState.compareFunction(a, b) * sortState.sortDirection;
            if (comparison !== 0) {
                return comparison;
            }
        }
        return comparison;
    }

    private sortedData(): Array<TData> {
        if (this.state.sort.length === 0) {
            return this.props.data;
        } else {
            return this.props.data.slice().sort((a, b) => this.compare(a, b));
        }
    }

    setSortColumn(column: ColumnSettings<TData>, multiSelect: boolean) {
        let sortDirection: SortDirection;
        // shallow clone of elements of sort so they can be mutated before setState()
        let sort: Array<ColumnSortState<TData>> = this.state.sort.map(sortState => Object.assign({}, sortState));

        let selectedColumn = sort.filter(sortColumn => sortColumn.columnTitle === column.title)[0];
        if (!multiSelect) {
            // empty the array
            sort.length = 0;
        }

        if (selectedColumn) {
            // This column was already selected, so toggle the direction
            selectedColumn.sortDirection = selectedColumn.sortDirection === SortDirection.Ascending
                ? SortDirection.Descending
                : SortDirection.Ascending;
            if (sort.indexOf(selectedColumn) === -1) {
                sort.push(selectedColumn);
            }
        } else if (column.compareFunction) {
            sort.push({
                columnTitle: column.title,
                compareFunction: column.compareFunction,
                sortDirection: SortDirection.Ascending
            });
        }

        this.setState({ sort: sort });
    }

    private renderHeader(column: ColumnSettings<TData>): JSX.Element {
        var sortState = this.state.sort.filter(sortState => sortState.columnTitle === column.title)[0];
        var text: string;
        if (sortState) {
            var prefixSymbol = sortState.sortDirection == SortDirection.Ascending
                ? "\u25B2"
                : "\u25BC";
            text = prefixSymbol + " " + column.title;
        } else {
            text = column.title;
        }
        return <td onClick={e => this.setSortColumn(column, e.shiftKey) }>{ text }</td >;
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