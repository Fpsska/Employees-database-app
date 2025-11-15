import { type FC } from 'react';
import { tableStore } from '../../../store/table.store';
import { declensionByQuantity } from '../../../utilts/helpers/declensionByQuantity';
import FindForm from '../../../components/layout/FindForm/FindForm';
import { observer } from 'mobx-react-lite';

// /. imports

const contactTranslates = ['контакт', 'контакта', 'контактов'];

const SearchSection: FC = () => {
    const {
        filteredContacts,
        isLoading,
        fetchStatus,
        isEditingMode,
        // actions
        setTableEditingKey,
        switchEditingMode
    } = tableStore;

    const contactsTextValue = declensionByQuantity(
        filteredContacts.length,
        contactTranslates
    );

    const isBtnSearchAvailable =
        !isLoading && fetchStatus === 'success' && filteredContacts.length;

    // /. hooks

    const onEditButtonClick = (): void => {
        switchEditingMode(!isEditingMode);
        setTableEditingKey('');
    };

    // /. functions

    return (
        <div className="search-section">
            <div className="search-section__group">
                <div className="search-section__info">
                    <span className="search-section__counter">
                        {filteredContacts.length || 0}
                    </span>
                    <span className="search-section__text">
                        {contactsTextValue}
                    </span>
                </div>
                <FindForm />
            </div>
            <button
                className={`search-section__button ${
                    isEditingMode ? 'active' : ''
                }`}
                type="button"
                disabled={!isBtnSearchAvailable}
                onClick={onEditButtonClick}
            >
                Режим редактирования
            </button>
        </div>
    );
};

export default observer(SearchSection);
