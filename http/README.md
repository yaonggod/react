# HTTP 요청

- 브라우저에서 직접적으로 DB에 접근하는 것은 절대 밴, 인증 정보 등이 읽힐 수 있음

- 백엔드 서버를 통해 간접적으로 접근, 백엔드가 데이터베이스와 통신

## fetch

- Promise 객체를 반환
- then과 catch로 체이닝

```react
const [movies, setMovies] = useState([]);
  function fetchMovies() {
    // API로 요청 보내기, default는 GET
    fetch('https://swapi.dev/api/films/').
    then(response => {
      // 응답 json화
      return response.json();
    }).then(data => {
      // json 파싱
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      // useState에 파싱한 데이터 저장
      setMovies(transformedMovies);
    })
  }

```

- async, await

```react
const [movies, setMovies] = useState([]);
  async function fetchMovies() {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    const transformedMovies = data.results.map(movieData => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date
      }
    })
    setMovies(transformedMovies);
  }
```

## 로딩

로딩 상태를 state로 관리

```react
const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
async function fetchMovies() {
    setIsLoading(true);
    ...
    setIsLoading(false);
    }

{!isLoading &&<MoviesList movies={movies} />}
{isLoading && <p>loading...</p>}
```

## 에러

```react
fetch().then().catch()
```

try - catch

- 에러 상태관리
- 에러 메시지 렌더링

```react
const [error, setError] = useState(null);

try {
  const response = await fetch('https://swapi.dev/api/film/');
  const data = await response.json();

  if (!response.ok) {
    throw new Error('error')
  }
  ...
} catch (error) {
  setError(error.message);
}
    
{!isLoading && error && <p>{error}</p>}
```

## useEffect

- 컴포넌트가 재평가될 때 수행
- 의존성 목록 : 배열의 원소가 바뀔 때에만 재실행
- 외부 상태를 사용하기 위해 함수를 의존성에 추가 -> 재랜더링 될 때마다 함수가 바뀜 -> 무한루프 -> callback함수로 만들기

```react
useEffect(() => { fetchMovies(); }, [fetchMovies]);
```

## useCallback

- 메모이제이션된 함수를 반환

- state는 변하지 않음 -> 의존성에 추가 X

```react
const fetchMovies = useCallback(async () => {}, [])
```

