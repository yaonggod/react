# redux

`local state` 

- 한 컴포넌트에만 영향 => `useState` `useReducer`

`cross-component state` `app-wide state`

- 여러 개의 컴포넌트나 전체 컴포넌트에 영향 => `prop chains` `prop drilling` => `context` `redux`로 해결

```bash
npm install redux
npm install redux react-redux
npm install @reduxjs/toolkit
```

## context 말고 redux가 필요한 이유

- 큰 규모의 앱에 적용하기에는 복잡함, 여러 종류의 context가 중첩이 심하게 될 수 있음
- 빈도가 높은 업데이트에는 context가 적합하지 않음

## redux 작동 방식

- 단일 store에 원하는 상태를 저장
- 컴포넌트는 store의 상태를 직접 조작하지 않음, reducer 함수가 mutate함
- 컴포넌트는 action을 reducer로 보내서 상태 조작을 요청

### 함수형 컴포넌트

```react
import { createStore } from 'redux';

// reducer
// input: 기존 state, dispatched action
// output: 새 state
const counterReducer = (state = { counter: 0 }, action) => {
    
    // 받은 action에 따라서 state를 변화시키기
    
    if (action.type === 'increment') {
        return { counter: state.counter + 1 }
    }

    if (action.type === 'decrement') {
        return { counter: state.counter - 1 }
    }

    return state;
}

// store
const store = createStore(counterReducer);

export default store;
```

```react
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));

// App을 Provider로 감싸고 App과 하위 컴포넌트들이 store에 접근하게 하기
root.render(<Provider store={store}><App /></Provider>);
```

```react
// useSelector => state 접근, useDispatch => action trigger
import { useSelector, useDispatch } from 'react-redux';

// store의 state에 접근하기
const counter = useSelector(state => state.counter);

// reducer를 trigger할 action 만들기
const dispatch = useDispatch();

const incrementHandler = () => {
	dispatch({ type: 'increment' });
};
const decrementHandler = () => {
	dispatch({ type: 'decrement' });
};
```

action에 payload 같이 보내기

```react
const increaseHandler = () => {
    dispatch({ type: 'increase', amount: 5 })
}
```

```react
if (action.type === 'increase') {
    return { counter: state.counter + action.amount }
}
```

여러 개의 상태를 관리하기

```react
const initialState = { counter: 0, showCounter: true };

if (action.type === 'toggle') {
    return { counter: state.counter, showCounter: !state.showCounter }
}
```

```react
const counter = useSelector(state => state.counter);
const showCounter = useSelector(state => state.showCounter);
const dispatch = useDispatch();
```

***redux로 관리할 때 state를 직접 조작하지 않기, state를 새로운 객체로 덮어써야 함***

```react
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

if (action.type === 'toggle') {
    state.showCounter = !state.showCounter;
    return state;
}

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

if (action.type === 'toggle') {
    return { counter: state.counter, showCounter: !state.showCounter }
}

// OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
```

### 클래스형 컴포넌트

```react
import { Component } from 'react';
import { connect } from 'react-redux';

class Counter extends Component {
  // props의 dispatch를 받아서 handler로 만들기
  incrementHandler() {
    this.props.increment();
  };
  decrementHandler() {
    this.props.decrement();
  };
  toggleCounterHandler() {};

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <!-- 이 컴포넌트의 handler를 참조하고 있음을 bind(this)로 명시 -->
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
      </main>
    )
  }
}

// state와 dispatch를 props로 보내고
const mapStateToProps = state => {
  return {
    counter: state.counter
  };
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' })
  }
}

// Counter 컴포넌트를 redux에 connect하기
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

## Redux Toolkit

redux 설치되어 있을 시 삭제하기, redux 포함되어있음

```bash
npm install @reduxjs/toolkit
```

### State slice

state를 여러 조각으로 파편화

```react
import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
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

const store = createStore(counterSlice.reducer);
export default store;
```

action 생성자: action 객체를 생성 

```react
export const counterActions = counterSlice.actions;
export default store;
```

```react
import { counterActions } from '../store/index';
const incrementHandler = () => {
    dispatch(counterActions.increment());
};
const increaseHandler = () => {
    // action객체 생성, 기본으로 type이 들어가고 필요하면 payload가 들어감
	dispatch(counterActions.increase(5)) 
}
```

여러 개의 상태 slice 사용하기

```react
import { configureStore } from '@reduxjs/toolkit';

// reducer객체로 slice의 reducer 매칭하기
const store = configureStore({
    reducer: { counter: counterSlice.reducer, auth: authSlice.reducer }
});
   
export default store;
```

```react
// 각각의 reducer에 접근하기
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
const counter = useSelector(state => state.counter.counter);
```

=> slice들을 별도의 js 파일로 만들어서 import해와서 하나의 store로 합쳐서 내보내기  

## Redux와 비동기

- reducer는 순수 함수이고, side-effect free하고, 동기적임
  === 같은 인풋을 넣었으면 아웃풋도 같아야함
- 그러면 http요청처럼 부수 효과가 수반되고 비동기적인 작업은 어디에다가 배치해야함?
  -  `useEffect()` 로 컴포넌트에서 처리하고 결과물을 redux에 전달하거나 
  - 새로운 `action creator`를 만들거나 

