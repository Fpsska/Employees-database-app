import React, { useState, useEffect } from 'react';

import { Skeleton, Space } from 'antd';

import avatar from 'assets/images/profile-image.png';

import './profile.scss';

// /. imports

const Profile: React.FC<{ additionalClass: string }> = ({
    additionalClass
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // /. hooks

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    // /. effects

    return (
        <div className={`profile ${additionalClass ? additionalClass : ''}`}>
            <div className="profile__wrapper">
                <div className="profile__preview">
                    {isLoading ? (
                        <Space align="start">
                            <Skeleton.Avatar
                                active
                                size={56}
                            />
                            <Space direction="vertical">
                                <Skeleton.Button
                                    active
                                    size="small"
                                />
                                <Skeleton.Input
                                    active
                                    size="small"
                                />
                            </Space>
                        </Space>
                    ) : (
                        <>
                            <div className="profile__image">
                                <img
                                    src={avatar}
                                    alt="profile image"
                                />
                            </div>
                            <div className="profile__information">
                                <span className="profile__nickname">
                                    Kristina 🐰
                                </span>
                                <span className="profile__position">
                                    менеджер продаж
                                </span>
                            </div>
                        </>
                    )}
                </div>
                <button
                    className="profile__button"
                    aria-label="open dropdown menu"
                    disabled={isLoading}
                >
                    <svg
                        width="12"
                        height="6"
                        viewBox="0 0 12 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.65465 5.43305C6.27888 5.75848 5.72112 5.75848 5.34535 5.43305L1.09937 1.75593C0.399466 1.14979 0.828137 -1.15152e-06 1.75402 -1.07058e-06L10.246 -3.28187e-07C11.1719 -2.47243e-07 11.6005 1.14979 10.9006 1.75593L6.65465 5.43305Z"
                            fill="#B6BCC3"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Profile;
