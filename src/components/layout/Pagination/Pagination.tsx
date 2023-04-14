import React from 'react';

import { Pagination as AntPagination } from 'antd';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { setCurrentPageValue, setItemsPerPage } from 'app/slices/tableSlice';

import './pagination.scss';

// /. imports

const Pagination: React.FC = () => {
    const {
        filteredContactsData,
        isContactsDataLoading,
        itemPerPage,
        currentPage
    } = useAppSelector(state => state.tableSlice);

    const dispatch = useAppDispatch();

    // /. hooks

    return (
        <AntPagination
            className="pagination"
            disabled={isContactsDataLoading}
            total={filteredContactsData.length}
            current={currentPage}
            pageSize={itemPerPage}
            pageSizeOptions={[8, 10, 20, 50, 100]}
            showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
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
