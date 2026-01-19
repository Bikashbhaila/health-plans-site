export type HealthPlan = {
    id: string;
    name: string;
    provider: string;
    monthlyPremium: number;
    deductible: number;
    description: string;
};

export type ComparisonTrayProps  = {
    selectedCount: number;
    onClear: () => void;
};

export type SnackBarWrapperProps = {
    open: boolean;
    onClose: () => void;
};

export type ClearSearchProps = {
    onClear: () => void;
}
