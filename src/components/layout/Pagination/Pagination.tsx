import React from 'react';

import { Pagination as AntPagination } from 'antd';

import './pagination.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    setCurrentPageValue,
    setItemsPerPage
} from '../../../app/slices/tableSlice';

// /. imports

const Pagination: React.FC = () => {
    const {
        filteredContactsData,
        isContactsDataLoading,
        itemPerPage,
        currentPage
    } = useAppSelector((state) => state.tableSlice);

    const dispatch = useAppDispatch();

    // /. hooks

    return (
        <AntPagination
            className="pagination"
            disabled={isContactsDataLoading}
            total={filteredContactsData?.length || 0}
            current={currentPage}
            pageSize={itemPerPage}
            pageSizeOptions={[8, 10, 20, 50, 100]}
            showTotal={(total, range) =>
                `показано ${range[0]}-${range[1]} из ${total} результатов`
            }
            onChange={(value: number) => {
                dispatch(setCurrentPageValue(value));
            }}
            onShowSizeChange={(_, pageSize: number) => {
                dispatch(setItemsPerPage(pageSize));
            }}
        />
    );
};

export default Pagination;
