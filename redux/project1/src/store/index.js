import { createStore } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // action에 따라서 다른 메소드 호출
        // state를 직접 변화시키는게 아니라 내부적으로 새로운 객체를 오버라이드함
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter += action.amount;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        },
    }
});

// reducer
const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return { counter: state.counter + 1, showCounter: state.showCounter }
    }

    if (action.type === 'increase') {
        return { counter: state.counter + action.amount, showCounter: state.showCounter }
    }

    if (action.type === 'decrement') {
        return { counter: state.counter - 1, showCounter: state.showCounter }
    }

    if (action.type === 'toggle') {
        return { counter: state.counter, showCounter: !state.showCounter }
    }

    return state;
}

// store
const store = createStore(counterReducer);

export default store;

