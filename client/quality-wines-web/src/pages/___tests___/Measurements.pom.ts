import { fireEvent, screen } from '@testing-library/react';

export const queryByCircularProgresMeasurements = () => {
    return screen.queryByTestId(/circular-progress-measurements/i);
}

export const queryByWinesTable = () => {
    return screen.queryByTestId(/wines-table/i);
}

export const queryAllByWinesTableRows = () => {
    return screen.queryAllByTestId(/^row-\d$/);
}

export const clickAddWineButton = () => {
    const addButton = screen.getByLabelText(/add wine button/i);

    fireEvent.click(addButton);
}

export const queryByWineForm = () => {
    const wineForm = screen.queryByTestId(/wine-form/i);

    return wineForm;
}