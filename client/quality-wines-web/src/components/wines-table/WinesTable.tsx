import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { Box, Button, CircularProgress, Collapse, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, styled, tableCellClasses, useTheme } from "@mui/material";
import { useState } from "react";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import OperationsCell from "./OperationsCell";
import { NEW_WINE } from "../new-wine-form/NewWineForm";

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function WinesTable({ rows, onAddWineClick, onEditWineClick, onDeleteWineClick, idDeleteLoading }: {
    rows: NEW_WINE[],
    onAddWineClick: () => void,
    onEditWineClick: (id: string) => void,
    onDeleteWineClick: (id: string) => void,
    idDeleteLoading: string
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [openId, setOpenId] = useState<string>('');
    const uncollapseRow = (id: string) => {
        if (id === openId) {
            setOpenId('');
        } else {
            setOpenId(id);
        }
    }

    return (
        <TableContainer component={Paper} data-testid='wines-table' >
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>Operations <Button aria-label="add wine button"  onClick={() => onAddWineClick()} ><AddCircleIcon /></Button ></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Year</TableCell>
                        <TableCell align="right">Variety</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Color</TableCell>
                        <TableCell align="right">Temperature</TableCell>
                        <TableCell align="right">Graduation</TableCell>
                        <TableCell align="right">Ph</TableCell>
                        <TableCell align="right">Observations</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row, i) => (
                        <StyledTableRow data-testid={`row-${i}`} key={row._id}>
                            <StyledTableCell >
                                {row._id !== openId &&
                                    <>
                                        <OperationsCell id={row._id} onDelete={onDeleteWineClick} onEdit={onEditWineClick} showLoading={row._id === idDeleteLoading} />
                                    </>
                                }


                            </StyledTableCell>
                            <StyledTableCell data-testid={`row-name-${row._id}`}  >
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.year}</StyledTableCell>
                            <StyledTableCell align="right">{row.variety}</StyledTableCell>
                            <StyledTableCell align="right">{row.type}</StyledTableCell>
                            <StyledTableCell align="right">{row.color}</StyledTableCell>
                            <StyledTableCell align="right">{row.temperature}</StyledTableCell>
                            <StyledTableCell align="right">{row.graduation}</StyledTableCell>
                            <StyledTableCell align="right">{row.ph}</StyledTableCell>
                            <StyledTableCell align="right">{row.observations}</StyledTableCell>
                        </StyledTableRow>
                    ))}



                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
