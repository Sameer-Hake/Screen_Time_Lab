import '../../css/Import/Table.css';
import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import Button from 'react-bootstrap/Button';
import useValidateTaskRecords from '../../../Utils/useValidateTaskRecords';

const Table = (props) => {
    let [ValidatedData, SkippedRecord] = useValidateTaskRecords(props.CSVFiledata);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pageInput, setPageInput] = useState('1');
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const toggleRowSelection = (row) => {
        const rowId = row.original.task_name; // Assuming task_name is a unique identifier
        if (selectedRows.includes(rowId)) {
            setSelectedRows(selectedRows.filter(id => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    };

    let data = props.CSVFiledata;
    let columns = React.useMemo(
        () => [
            {
                Header: "Task Name",
                accessor: "taskDescription",
            },
            {
                Header: "Kids",
                accessor: "Kids",
            },
            {
                Header: "Duration",
                accessor: "Duration",
            },
            {
                Header: "Frequency",
                accessor: "freq",
            },
        ],
        []
    );

    // Use the useTable and usePagination hooks
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: itemsPerPage }, // Set initial items per page
        },
        usePagination
    );

    const handlePageChange = (e) => {
        e.preventDefault();
        const pageNumber = parseInt(pageInput);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pageCount) {
            gotoPage(pageNumber - 1);
        }
    };

    return (
        <div className='table-container'>
            <table {...getTableProps()} className="task-table">
                <thead className="task-table-thead">
                    <tr className='task-table-row'>
                        <th className="task-table-header">Select</th>
                        {headerGroups.map((headerGroup) => (
                            headerGroup.headers.map((column) => (
                                <th className="task-table-header" {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))
                        ))}
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()} className="task-table-tbody">
                    {props.CSVFiledata.length === 0 ? (
                        <tr className='task-table-row'>
                            <td colSpan={columns.length + 1} className="task-table-td">
                                <span className='no-task-data'>NO task data to display</span>
                            </td>
                        </tr>
                    ) : (
                        page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr className='task-table-row' {...row.getRowProps()}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() => toggleRowSelection(row)}
                                            checked={selectedRows.includes(row.original.task_name)}
                                            className="task-table-td"
                                        />
                                    </td>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="pagination">
                <Button
                    variant="secondary"
                    onClick={() => {
                        previousPage();
                        setPageInput((pageIndex - 1 + 1).toString());
                    }}
                    disabled={!canPreviousPage}>
                    <i className="fa-solid fa-less-than"></i>
                </Button>

                <span className="paging-info footer-item">
                    <span className="paging-info-inner">
                        Page
                        <form onSubmit={handlePageChange}>
                            <input
                                type="text"
                                placeholder="Page"
                                value={pageInput}
                                onChange={(e) => setPageInput(e.target.value)}
                                className="jump-on-page"
                            />
                        </form>
                        of {pageOptions.length}
                    </span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setPageSize(Number(e.target.value));
                        }}
                        className='no-of-rows'>
                        {[10, 20, 50, 100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize} rows
                            </option>
                        ))}
                    </select>
                </span>

                <Button
                    variant="secondary"
                    onClick={() => {
                        nextPage();
                        setPageInput((pageIndex + 1 + 1).toString());
                    }}
                    disabled={!canNextPage}>
                    <i className="fa-solid fa-greater-than"></i>
                </Button>
            </div>
        </div>
    );
}

export default Table;
