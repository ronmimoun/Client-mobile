

import { IconDefaultProps, IconProps } from './icon-types';

export const HomeIcon = ({ size, className }: IconProps) => {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M25.5692 23.1545V14.2145C25.5692 13.4941 25.4227 12.7812 25.1385 12.1193C24.8543 11.4573 24.4384 10.8601 23.9161 10.3639L15.4488 2.32153C14.9553 1.85267 14.3006 1.59125 13.6198 1.59125C12.9391 1.59125 12.2843 1.85267 11.7908 2.32153L3.32219 10.3639C2.79991 10.8601 2.38402 11.4573 2.09984 12.1193C1.81565 12.7812 1.6691 13.4941 1.6691 14.2145V23.1545C1.6691 23.8588 1.94888 24.5342 2.4469 25.0322C2.94491 25.5302 3.62037 25.81 4.32467 25.81H22.9136C23.6179 25.81 24.2934 25.5302 24.7914 25.0322C25.2894 24.5342 25.5692 23.8588 25.5692 23.1545Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient id="gradient" x1="16.6431" y1="8.71605" x2="-0.457022" y2="32.0314" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5B259F" />
                    <stop offset="0.865721" stopColor="#BAA9F7" />
                </linearGradient>
            </defs>
        </svg>
    )
}

HomeIcon.defaultProps = IconDefaultProps