import { type FC } from 'react';

import { Pagination as AntPagination } from 'antd';

import { tableStore } from '../../../store/table.store';

import './pagination.scss';
import { observer } from 'mobx-react-lite';

// /. imports

const pageSizeOptions = [8, 10, 20, 50, 100];

const Pagination: FC = () => {
    const {
        isDataLoading,
        filteredContactsData,
        currentPage,
        itemPerPage,
        // actions
        setCurrentPageValue,
        setItemsPerPage
    } = tableStore;

    return (
        <AntPagination
            className="pagination"
            disabled={isDataLoading}
            total={filteredContactsData?.length || 0}
            current={currentPage}
            pageSize={itemPerPage}
            pageSizeOptions={pageSizeOptions}
            showTotal={(total, range) =>
                `показано ${range[0]}-${range[1]} из ${total} результатов`
            }
            onChange={setCurrentPageValue}
            onShowSizeChange={(_, pageSize: number) =>
                setItemsPerPage(pageSize)
            }
        />
    );
};

export default observer(Pagination);
