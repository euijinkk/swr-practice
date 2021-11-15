import { client, fetcher } from "libs/api";
import useSWR from "swr";
import styled from "styled-components";
import Articles from "Articles";

export interface IArticles {
  id: number;
  title: string;
}

export interface ArticleSWRResponse<T> {
  status: number;
  data: T;
}

function App() {
  const { data, error, mutate } = useSWR<ArticleSWRResponse<IArticles[]>>(
    "/article",
    fetcher,
    {
      refreshInterval: 100,
    }
  );
  const articleData = data?.data;

  const handlePost = async () => {
    if (!articleData) return;
    const id = articleData.length + 1;
    await client.post("article", { id, title: `${id}번째 게시물` });
  };

  const handleMutate = () => {
    mutate();
  };

  return (
    <StyledRoot>
      <Articles />
      <StyledCenterLine />
      {articleData &&
        articleData.map((li) => <div key={li.id}>{li.title}</div>)}
      <button onClick={handlePost}>post button</button>
      <button onClick={handleMutate}>mutate button</button>
    </StyledRoot>
  );
}

export default App;

const StyledRoot = styled.div``;

const StyledCenterLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: black;
`;
