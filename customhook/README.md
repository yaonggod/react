# 커스텀 리액트 훅

- 상태를 설정할 수 있는 로직을 포함한 함수 => 로직 재사용, 코드의 중복 감소 

- 리액트 훅과 다른 훅을 사용할 수 있음(정규 함수는 리액트 훅을 활용할 수 없음)

```react
const ForwardCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Card>{counter}</Card>;
};
```

```react
const BackwardCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Card>{counter}</Card>;
};
```

- `use`로 시작 == 훅의 역할을 하겠다고 명시  

```react
const useCounter = (value) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + value);
        }, 1000);

        return () => clearInterval(interval);
    }, [value]);

    return counter;
}
```

```react
const ForwardCounter = () => {
  return <Card>{useCounter(1)}</Card>;
};
```

```react
const BackwardCounter = () => {
  return <Card>{useCounter(-1)}</Card>;
};
```

## HTTP 커스텀 훅 



