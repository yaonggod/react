# 자바스크립트

## let const

`var`대신 `let`, `const` 사용 권장

`let` : 재할당 가능

`const` : 재할당 불가능, 상수

## 화살표 함수

```javascript
function callMe(name) {
    console.log(name);
}

const callMe = function(name) {
    console.log(name);
}

const callMe = (name) => {
    console.log(name);
}

// 매개변수 X
const callMe = () => {
    console.log('Max');
}

// 매개변수 하나
const callMe = name => {
    console.log(name);
}

// 리턴
const double = num => num * 2
```

## export import

default : 기본으로 내보내기

```javascript
export default person;

import person from '/person.js';
import p from '/person.js';
```

named : 이름을 붙여서 내보내기

```javascript
export const someData = 'data';
export const someFunc = () => {}

import { someData } from '/file.js';
import { someFunc } from '/file.js';
import { someData as d } from '/file.js';
import * as bundled from '/file.js';
```

## 클래스

```javascript
class Person {
    constructor () {
        this.name = 'Max';
    }
    printMyName () {
        console.log(this.name);
    }
}

// 생성자, this 생략 가능
class Person {
    name = 'Max';
    printMyName = () => {
        console.log(this.name);
    }
}

// 상속
class Human {
    constructor() {
        this.species = 'human';
    }	
}

class Person extends Human {
    constructor () {
        super();
        this.name = 'Max';
    }
    printMyName = () => {
        console.log(this.name);
    }
}
```

## 스프레드, 나머지 연산자

스프레드 : 기존 배열이나 객체의 속성을 새로운 배열이나 객체에 넣기

```javascript
const oldArr = [1, 2, 3]
const newArr = [...oldArr, 4, 5]

const oldObj = { prop1: '1', prop2: '2' }
const newObj = { ...oldObj, prop3: '3'}
```

나머지 연산자 : 매개변수들을 하나의 배열로 묶기

```javascript
function sortArgs(...args) {
    return args.sort()
}
```

## 구조분해할당

배열의 원소나 객체 속성을 변수로 저장하는 것

```javascript
[a, b] = ['Hello', 'Max']
console.log(a); // Hello
console.log(b); // Max

{name} = {name: 'Max', age: 25}
console.log(name); // Max
console.log(age); // undefined
```

## 참조형, 원시형 데이터

참조형 : 객체, 배열, 데이터의 주소를 참조

원시형(기본형) : number, string, boolean, 값을 복사

## 배열 함수

`filter()` 조건에 해당하는 값만 골라서 배열에 넣음

`sort()` 정렬

`map()` 원소마다 함수를 적용한 값을 반

`find()`

`findIndex()`

`reduce()`

`concat()`

`slice()`

`splice()`