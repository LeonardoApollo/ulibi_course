import { buildSelector } from '@/shared/libs/store';

export const [useCounterValue, getCounterValue] = buildSelector(
    (state) => state.counter.value,
);
