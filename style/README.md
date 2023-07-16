# 리액트 컴포넌트 스타일링

## 동적 스타일링

인라인 스타일이 최우선

```react
<label style={{ color: !isValid ? 'red' : 'black'}}>Course Goal</label>
```

클래스 토글

```react
<div className={`form-control ${!isValid ? 'invalid' : ''}`}>
```

## Styled Components

css를 전역적으로 적용하는 것이 아닌 지정된 컴포넌트에서만 적용할 수 있게 

```bash
npm install --save styled-components
```

```react
import styled from 'styled-components';

// styled 객체의 button 메소드 -> 새로운 버튼 컴포넌트 반환
// Button에만 적용할 style 백틱 안에 넣기
const Button = styled.button`
  
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover,
  &:active {
    background: #ac0e77;
    border-color: #ac0e77;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
  }
`;
```

component에 props을 보내서 조건에 따라서 style 토글하기

```react
<FormControl invalid={!isValid}></FormControl>

const FormControl = styled.div`
  
  margin: 0.5rem 0;

  & label {
    color: ${props => props.invalid ? 'red' : 'black'};
  }

  & input {
    border: 1px solid ${props => props.invalid ? 'red' : '#ccc'};
    outline: ${props => props.invalid ? 'red' : 'none'};
  }
`;
```

미디어 쿼리

```react
const Button = styled.button`
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }
`;
```

## CSS 모듈

```react
import styles from './Button.module.css';

<div className={styles.button}></div>
```

동적으로 스타일 적용하기

```react
<div className={`${styles['form-control']} ${!isValid && styles.invalid}`}></div>
```

미디어 쿼리

```css
@media (min-width: 768px) {
  .button {
    width: auto;
  }
}
```

