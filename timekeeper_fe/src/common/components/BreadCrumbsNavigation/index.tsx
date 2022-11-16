import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import StyledBreadcrumb from './components/StyledBreadcrumb';

export interface ICrumb {
    label: string;
    link: string;
    icon: JSX.Element;
}

export interface IBreadcrumbsNavigationProps {
    handleClick: (param: ICrumb['link']) => void;
    crumbs: ICrumb[];
};

export default function BreadcrumbsNavigation(props: IBreadcrumbsNavigationProps) {
    const { handleClick, crumbs } = props;
    return (
        <Breadcrumbs>
            {crumbs.map(crumb => (
                <StyledBreadcrumb
                    size='small'
                    key={crumb.label}
                    label={crumb.label}
                    icon={crumb.icon}
                    onClick={() => handleClick(crumb.link)}
                />
            ))}
        </Breadcrumbs>
    );
}
