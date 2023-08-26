import { StateSchema } from 'app/providers/StoreProvider';
import { getScrollSave, getScrollSaveByPath } from './getScrollSave';

describe('ScrollSave.test', () => {
    test('should return scroll', () => {
        const state: DeepPartial<StateSchema> = {
            scrollSave: {
                scroll: {
                    '/about': 500,
                },
            },
        };
        expect(getScrollSave(state as StateSchema)).toEqual({ '/about': 500 });
    });
    test('should work with empty scroll', () => {
        const state: DeepPartial<StateSchema> = {
            scrollSave: {
                scroll: {},
            },
        };
        expect(getScrollSave(state as StateSchema)).toEqual({});
    });
    test('should return scroll number value', () => {
        const state: DeepPartial<StateSchema> = {
            scrollSave: {
                scroll: {
                    '/about': 500,
                },
            },
        };
        expect(getScrollSaveByPath(state as StateSchema, '/about')).toEqual(500);
    });
});
