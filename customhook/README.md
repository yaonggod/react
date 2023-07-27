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

http fetch 기능을 커스텀 훅으로 이관시켜서 다양한 요청을 하나의 커스텀 훅으로 처리

task를 fetch하는 요청을 보낼 때 객체와 함수 객체가 컴포넌트 재평가시 계속 변경되므로 useCallback과 의존성을 적절히 활용

```react
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        }        
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, [])
  return {
    isLoading,
    error,
    sendRequest,
  }
};
```

```react
const [tasks, setTasks] = useState([]);

const { isLoading, error, sendRequest: fetchTasks } = useHttp();

useEffect(() => {
    const transformTasks = tasksObj => {
      const loadedTasks = [];
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
      setTasks(loadedTasks);
    }
    fetchTasks({url: 'https://task-b4e1f-default-rtdb.firebaseio.com/tasks.json'}, transformTasks);
}, [fetchTasks]);

const taskAddHandler = (task) => {
	setTasks((prevTasks) => prevTasks.concat(task));
};
```

POST요청은 onClick에서만 발동되므로 useCallback 쓸 필요가 없음

```react
const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  }

const enterTaskHandler = async (taskText) => {
    sendTaskRequest({ 
        url: 'https://task-b4e1f-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: { text: taskText }
        // this(필요없음 => null), taskText를 고정시키고 추가로 다른 매개변수(response.json()) 받아서 createTask의 taskData에 넣음
      }, createTask.bind(null, taskText)); 
}
```

