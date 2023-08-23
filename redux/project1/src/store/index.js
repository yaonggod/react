import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
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
            state.counter += action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        },
    }
});

const initialAuthState = { isAuthenticated: false }

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
})

const store = configureStore({
    reducer: { counter: counterSlice.reducer, auth: authSlice.reducer }
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;

// // reducer
// const counterReducer = (state = initialState, action) => {
//     if (action.type === 'increment') {
//         return { counter: state.counter + 1, showCounter: state.showCounter }
//     }

//     if (action.type === 'increase') {
//         return { counter: state.counter + action.amount, showCounter: state.showCounter }
//     }

//     if (action.type === 'decrement') {
//         return { counter: state.counter - 1, showCounter: state.showCounter }
//     }

//     if (action.type === 'toggle') {
//         return { counter: state.counter, showCounter: !state.showCounter }
//     }

//     return state;
// }

// // store
// const store = createStore(counterReducer);

// export default store;

