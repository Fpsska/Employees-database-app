import { type FC } from 'react';

import { useLocation } from 'react-router';

// /. imports

const PlaceholderPage: FC = () => {
    const location = useLocation();

    // /. hooks

    return (
        <div className="placeholder-page">
            <h1 className="title center">
                {location.state || 'Placeholder title'}
            </h1>
        </div>
    );
};

export default PlaceholderPage;
