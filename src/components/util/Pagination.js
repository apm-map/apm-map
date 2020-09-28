import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    pagination: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    },
    paginationText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}));

export default function Pagination({ items, itemsPerPage, setCurrentPageItems }) {
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);
    const numPages = Math.ceil(items.length / itemsPerPage);

    const getItemsOnPage = useCallback(
        (pageNo) => (
            items.slice(
                itemsPerPage * (pageNo - 1),
                itemsPerPage * pageNo,
            )
        ),
        [items, itemsPerPage],
    );

    useEffect(() => {
        setCurrentPageItems(getItemsOnPage(currentPage));
    }, [setCurrentPageItems, getItemsOnPage, currentPage]);

    const itemRangeBeginning = itemsPerPage * (currentPage - 1) + 1;
    const itemRangeEnd =
        currentPage === numPages ? items.length : itemsPerPage * currentPage;

    return (
        <div className={classes.pagination}>
            <IconButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}>
                <ChevronLeftIcon />
            </IconButton>
            <Typography variant="body1" align="center" gutterBottom className={classes.paginationText}>
                {itemRangeBeginning === itemRangeEnd
                    ? itemRangeBeginning
                    : itemRangeBeginning + '-' + itemRangeEnd}{" "}
      of {items.length}
            </Typography>
            <IconButton
                disabled={currentPage === numPages}
                onClick={() => setCurrentPage(currentPage + 1)}>
                <ChevronRightIcon />
            </IconButton>
        </div>
    );
}

Pagination.propTypes = {
    items: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    setCurrentPageItems: PropTypes.func.isRequired,
};
