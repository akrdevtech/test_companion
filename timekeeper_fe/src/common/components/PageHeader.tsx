import { Box, Grid, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { EPageTitles } from '../enums/global';
import BreadcrumbsNavigation, { ICrumb } from './BreadCrumbsNavigation';

export interface IPageHeaderProps {
    breadCrumbs: ICrumb[];
    handleBreadCrumbsClick: (param?: ICrumb['link']) => void;
    pageTitle: EPageTitles;
    children: ReactNode;
};

const PageHeader = (props: IPageHeaderProps) => {
    const { breadCrumbs, handleBreadCrumbsClick, pageTitle, children } = props
    return (
        <Grid container direction="row">
            <Grid item xs={4}>
                <Typography variant='h5' color='primary'><b>{pageTitle}</b></Typography>
            </Grid>
            <Grid item xs={8} sx={{ textAlign: "right" }}>
                <Grid container direction="row" justifyContent="flex-end" alignItems="center" >
                    <BreadcrumbsNavigation handleClick={handleBreadCrumbsClick} crumbs={breadCrumbs} />
                </Grid>
            </Grid>
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
        </Grid>
    )
}

export default PageHeader