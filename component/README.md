# 리액트 기초, 컴포넌트

> 리액트 : 사용자 인터페이스(UI)를 만드는 자바스크립트 라이브러리
>

- 복잡하고 인터랙티브한 사용자 인터페이스를 쉽게 만들 수 있게 함으로써 비즈니스 로직에만 집중할 수 있게 함

- 리액트 == 컴포넌트에 관한 모든 것

>컴포넌트 : UI를 구성하는 요소, UI에서 재사용할 수 있는 요소 단위가 되는 html + css + js 코드의 결합

- 재사용성 - 코드의 반복을 피함

- 우려사항(관심사) 분리 - 컴포넌트 당 하나의 과제에 집중

- 선언적 접근 방식 - 목표 상태를 정의, 어떤 목표를 위해 DOM이 어떻게 업데이트되어야 하는지 명령하는 것이 아님
- 커스텀 html 요소를 만듦

```bash
// 초기 프로젝트 시작
npx create-react-app my-app
cd my-app
npm start

// 프로젝트 import 후 시작
npm install
```

## 프로젝트 구조

### src

#### App.js

컴포넌트

```javascript
function App() {
  return (
    <div>
      <h2>Let's get started!</h2>
    </div>
  );
}

export default App;
```

#### index.css

#### index.js

프로젝트 시작 시 가장 먼저 실행되는 파일

```javascript
// 리액트 요소를 브라우저에 렌더링하는 데 필요한 라이브러리
import ReactDOM from 'react-dom/client';

// js코드에 css를 import할 수 없음, npm start를 통해 App 전체에 index.css를 적용해줌
import './index.css';

// App이라는 만들어진 요소를 사용할 것
import App from './App';

// 루트를 public/index.html의 id="root"인 요소로 설정
const root = ReactDOM.createRoot(document.getElementById('root'));

// 루트에 App이라는 요소를 렌더링하자
root.render(<App />);
```

## JSX

자바스크립트 xml, UI를 편하게 렌더링하기 위해 자바스크립트 코드에 xml의 일종인 html을 넣어서 이를 자바스크립트로 해석할 수 있게 만드는 문법

선언형 접근 방식

```javascript
function App() {
  return (
    <div>
      <h2>Let's get started!</h2>
    </div>
  );
}

export default App;
```

명령형 접근 방식

```javascript
const app = document.createElement('div');
const heading = document.createElement('h2');
heading.textContent = "Let's get started!";
app.append(heading);
```

