import React from 'react';

import { useLocation } from 'react-router';

// /. imports

const PlaceholderPage: React.FC = () => {
    const location = useLocation();

    // /. hooks

    return (
        <div className="placeholder-page">
            <h1 className="page__title">
                {location?.state || 'PlaceholderPage'}
            </h1>
        </div>
    );
};

export default PlaceholderPage;
