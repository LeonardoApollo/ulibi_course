import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { Counter } from './Counter';

import { componentRender } from '@/shared/libs/tests/componentRender/componentRender';

describe('Counter', () => {
    test('test render', () => {
        act(() => {
            componentRender(<Counter />, {
                initialState: { counter: { value: 10 } },
            });
        });
        expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    });
    test('increment', async () => {
        act(() => {
            componentRender(<Counter />, {
                initialState: { counter: { value: 10 } },
            });
        });
        await act(async () => { await userEvent.click(screen.getByTestId('increment-btn')); });
        expect(screen.getByTestId('value-title')).toHaveTextContent('11');
    });
    test('decrement', async () => {
        act(() => {
            componentRender(<Counter />, {
                initialState: { counter: { value: 10 } },
            });
        });
        await act(async () => { await userEvent.click(screen.getByTestId('decrement-btn')); });
        expect(screen.getByTestId('value-title')).toHaveTextContent('9');
    });
});
