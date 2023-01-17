import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Histogram from './components/Histogram';

const GET_POSTS = gql`
  query {
    allPosts(count: 100) {
      title
      createdAt
      # @format(formatString: "MMM")
    }
  }
`;

function App() {
  const [histogramData, setHistogramData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isValid, setIsValid] = useState(false);
  const [postsNumber, setPostsNumber] = useState(0);
  const { loading, error, data } = useQuery(GET_POSTS);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const colorMap = {
    Jan: 'blue',
    Feb: 'green',
    Mar: 'red',
    Apr: 'purple',
    May: 'orange',
    Jun: 'pink',
    Jul: 'yellow',
    Aug: 'gray',
    Sep: 'brown',
    Oct: 'black',
    Nov: 'cyan',
    Dec: 'magenta',
  };

  useEffect(() => {
    if (!loading && !error) {
      const { allPosts } = data;

      setHistogramData(
        allPosts.map((item) => {
          const date = new Date(parseInt(item.createdAt));
          const month = date.toLocaleString('default', { month: 'short' });
          return { month: month, postCount: 1 };
        })
      );
    }

    if (!loading && !error && histogramData.length !== 0) {
      setIsValid(true);
      setPostsNumber(histogramData.length);
    }

    function handleResize() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loading, error, data, histogramData.length]);

  return (
    <>
      {loading && <h1>Loading ...</h1>}
      {isValid && (
        <>
        We have a total of {postsNumber} in 2019.
        <Histogram
          monthlyData={histogramData}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          months={months}
          colorMap={colorMap}
        />
        </>
      )}
    </>
  );
}

export default App;
