import { ScrollSaveSchema } from '../types/ScrollSaveSchema';
import { ScrollSaveActions, ScrollSaveReducer } from './ScrollSaveSlice';

const scroll: Record<string, number> = {
    '/about': 500,
};

describe('ScrollSaveSlice', () => {
    test('test add new', () => {
        const state: DeepPartial<ScrollSaveSchema> = { scroll };
        expect(
            ScrollSaveReducer(
                state as ScrollSaveSchema,
                ScrollSaveActions.setScrollPosition({
                    path: '/articles',
                    position: 700,
                }),
            ),
        ).toEqual({
            scroll: {
                '/about': 500,
                '/articles': 700,
            },
        });
    });
    test('test change existed', () => {
        const state: DeepPartial<ScrollSaveSchema> = { scroll };
        expect(
            ScrollSaveReducer(
                state as ScrollSaveSchema,
                ScrollSaveActions.setScrollPosition({
                    path: '/about',
                    position: 300,
                }),
            ),
        ).toEqual({
            scroll: {
                '/about': 300,
            },
        });
    });
});
