import { render } from "@testing-library/react";
import Measurements from "../Measurements";
import { useGetWinesQuery, useAddWineMutation } from "../../store/api/wines-qww-api";
import { clickAddWineButton,  queryAllByWinesTableRows, queryByCircularProgresMeasurements, queryByWineForm, queryByWinesTable } from "./Measurements.pom";
import { mock1 } from "./mocks";

jest.mock("../../store/api/wines-qww-api", () => {
    return {
        useDeleteWineMutation: () => [
            (id: string) => console.log('delete wine', id),
            {//response
                endpointName: 'deleteWine',
                isSuccess: false,
                isError: false,
                error: null
            }
        ],
        useGetWinesQuery: jest.fn(),
        useAddWineMutation: jest.fn(),
    }




});

jest.mock("../../store/store", () => {
    return {//response
        dispatch: () => { console.log('dispatch') }
    }
        ;
});

describe('Display wines table', () => {
    it('Should show the progress circle while loading the wines and not the wines table ', async () => {

        (useGetWinesQuery as jest.Mock<any, any>).mockReturnValue({
            data: [],
            isLoading: true,
            isSuccess: false,
            isError: false,
            error: null
        })

        render(<Measurements />);

        const circularProgress = queryByCircularProgresMeasurements();
        expect(circularProgress).toBeTruthy();

        const winesTable = queryByWinesTable();
        expect(winesTable).toBeNull();
    });

    it('Should not show the progress circle while loading the wines and display the table with no wines ', async () => {

        (useGetWinesQuery as jest.Mock<any, any>).mockReturnValue({
            data: [], //no wines
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: null
        })

        render(<Measurements />);

        const circularProgress = queryByCircularProgresMeasurements();
        expect(circularProgress).toBeNull();

        const winesTable = queryByWinesTable();
        expect(winesTable).toBeTruthy();
    });

    it('Should display a table of 2 wines wines ', async () => {

        (useGetWinesQuery as jest.Mock<any, any>).mockReturnValue({
            data: mock1, //mock with two wines
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: null
        })

        render(<Measurements />);

        const circularProgress = queryByCircularProgresMeasurements();
        expect(circularProgress).toBeNull();

        const winesTable = queryByWinesTable();
        expect(winesTable).toBeTruthy();

        const rows = queryAllByWinesTableRows();
        expect(rows.length).toBe(mock1.length); //number of rows should match the number of wines
    });


    it('Should open the form to add a new wine ', async () => {

        (useGetWinesQuery as jest.Mock<any, any>).mockReturnValue({
            data: mock1, //mock with two wines
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: null
        });


        (useAddWineMutation as jest.Mock<any, any>).mockReturnValue([
            (wineToAdd: any) => { console.log('wineToAdd ', wineToAdd); },
            {//response
                endpointName: 'addWine',
                isSuccess: false,
                isError: false,
                error: null
            }
        ]);

        render(<Measurements />);

        const circularProgress = queryByCircularProgresMeasurements();
        expect(circularProgress).toBeNull();

        const winesTable = queryByWinesTable();
        expect(winesTable).toBeTruthy();

        const rows = queryAllByWinesTableRows();
        expect(rows.length).toBe(mock1.length); //number of rows should match the number of wines

        await clickAddWineButton();

        const wineForm = queryByWineForm();

        expect(wineForm).toBeTruthy();

    });

});