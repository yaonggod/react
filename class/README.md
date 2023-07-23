# 클래스 컴포넌트

```react
import { Component } from 'react';

class Product extends Component {
    render() {
        return <p>product</p>
    }
}
```

- 리액트 훅이 발명되고 함수 컴포넌트를 쓸 수 있게 됨
- 클래스 컴포넌트는 리액트 훅 못씀
- props를 받을 때 this를 씀

```react
class User extends Component {
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}
```

- 함수형 컴포넌트랑 같이 쓸 수 있음

## State 관리

```react
class Users extends Component {
  constructor() {
    // Component를 상속받으므로 super() 넣기
    super();
    // 클래스 컴포넌트에서는 상태가 객체
    // 함수형 컴포넌트에서는 상태는 어느 형태든 다 가능
    this.state = {
      showUsers: true,
      another: 'test',
    };
  }

  toggleUsersHandler() {
    // this.state에 접근해서 상태 직접 변경 X - setState
    // 기존 상태를 오버라이드하지 않고 병합함 -> showUsers만 바뀌고 다른 상태는 내비둠
    this.setState((current) => {
      return { showUsers: !current.showUsers };
    });
  }

  render() {
    const usersList = (
      <ul>
        {DUMMY_USERS.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );
    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    )
  }
}
```

## 컴포넌트 수명 주기

`componentDidMount()` 컴포넌트가 마운트될 때 호출(`useEffect()`)

`componentDidUpdate()` 컴포넌트가 갱신될 때 호출(`useEffect(, [dependencies])`)

```react
componentDidUpdate(prevProps, prevState) {
    // 무한 루프를 막기 위해 변화 여부 체크
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) => 
        user.name.includes(this.state.searchTerm))})
    }
  }
```

`componentWillUnmount()` 컴포넌트가 DOM에서 삭제되기 전에 호출(`cleanup`)

## 컨텍스트

- static으로 컨텍스트 지정하기 - 한 개의 컨텍스트만 가능  

```react
class UserFinder extends Component {
    static contextType = UsersContext;
}
```

## 오류 경계

범위 내에서 오류가 발생할 때 해야 할 일, 리턴할 JSX 등을 지정 

`componentDidCatch()` 하위 컴포넌트가 오류를 만들거나 전달할 때 발동  

```react
import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor() {
        super();
        this.state = { hasError: false };
    }
    componentDidCatch(error) {
        this.setState({ hasError: true });
    }
    
    render() {
        if (this.state.hasError) {
            return <p>something went wrong</p>
        }
        return this.props.childern;
    }
}
```

에러 있으면 p태그를, 없으면 원래 자식인 User 컴포넌트를 렌더링

```react
return (
	<ErrorBoundary>
        <Users></Users>
    </ErrorBoundary>
)
```



