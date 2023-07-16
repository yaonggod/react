# Fragments, Portals, Refs

## Fragments

루트 JSX 요소는 단 한개만 허용 (== 함수 내에서 return을 여러 번 할 수 없음)

1. div 등 다른 요소로 감싸기 -> 컴포넌트 렌더링할 때마다 div 중첩(div soup)
2. 네이티브 자바스크립트 배열 -> 배열을 매핑하는 데 key가 필요 

```react  
return [error && <ErrorModal/>, <Card/>]
```

3. Wrapper 컴포넌트로 감싸기

```react
const Wrapper = props => {
    return props.children;
}

export default Wrapper;
```

```react
return <Wrapper></Wrapper>;
```

4. Fragment로 감싸기

```react
return <React.Fragment></React.Fragment>
return <></>
```

## Portals

컴포넌트가 맥락적으로 다른 곳에 있는게 적합할 때 보내고 싶은 html 요소로 보냄

`index.html`

```html
<div id="backdrop-root"></div>
<div id="overlay-root"></div>
<div id="root"></div>
```

createPortal(보낼 컴포넌트, 보낼 위치(DOM에서 찾기))

```react
import ReactDOM from 'react-dom';

return (
    <React.Fragment>
      {ReactDOM.createPortal(
          <Backdrop 
          onConfirm={props.onConfirm} />, 
          document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(
          <ModalOverlay 
          title={props.title} 
          message={props.message} 
          onConfirm={props.onConfirm}/>, 
          document.getElementById('overlay-root'))}
    </React.Fragment>
);
```

## Refs

해당 DOM 요소에 접근하는 데 활용

- 제어되는 컴포넌트 == state를 이용해 제어
- 제어되지 않는 컴포넌트 == state 이용 X

```react
import { useRef } from 'react';

const nameInputRef = useRef();

<input id="username" type="text" ref={nameInputRef}/>

// DOM 요소에 접근해서 value를 가져옴
const enteredName = nameInputRef.current.value;

// 사용 후 DOM을 조작해서 빈 칸으로 만들기
nameInputRef.current.value = '';
```

