import React from 'react'
import { Grid, Theme, Typography, useTheme } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';

export enum EStepperStepStatus {
    SUCCESS = "success",
    PENDING = "pending",
    ERROR = "error",
}

export interface IStepperStep {
    step: number | string;
    label: string;
    status: EStepperStepStatus;
    tabId: string;
}

const getStepColor = (status: EStepperStepStatus, isActive: boolean, theme: Theme): string => {
    if (isActive) {
        return theme.palette.warning.main;
    }
    switch (status) {
        case EStepperStepStatus.SUCCESS: return theme.palette.secondary.main;
        case EStepperStepStatus.PENDING: return theme.palette.text.secondary;
        case EStepperStepStatus.ERROR: return theme.palette.error.main;
        default: return theme.palette.text.secondary;
    }
}

interface IStepperStepProps {
    thisStep: IStepperStep;
    activeTab: string;
    handleActiveTabChange: (p: string) => void;
}

export function StepperStep(props: IStepperStepProps) {
    const { thisStep, activeTab, handleActiveTabChange } = props;
    const theme = useTheme();
    const stepColor = getStepColor(thisStep.status, thisStep.tabId === activeTab, theme);

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center"
            sx={{ minWidth: "100%", padding: 2, zIndex: 2, cursor: 'pointer' }}
            onClick={() => { handleActiveTabChange(thisStep.tabId) }}
        >
            <Grid item xs={2}>
                <Grid container direction="row" justifyContent="center" alignItems="center"
                    sx={{
                        borderRadius: 25, width: 25, height: 25, backgroundColor: stepColor
                    }}
                >
                    {thisStep.status === "success" ?
                        <CheckIcon sx={{ color: "white" }} /> :
                        <Typography variant='caption' color="white">
                            <b>{thisStep.step}</b>
                        </Typography>
                    }
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Typography variant='caption' sx={{ color: stepColor }}><b>{thisStep.label}</b></Typography>
            </Grid>
        </Grid>
    )
}

