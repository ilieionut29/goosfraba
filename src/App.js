import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Histogram from './components/Histogram';
import TotalPosts from './components/TotalPosts';

const GET_POSTS = gql`
  query {
    allPosts(count: 100) {
      title
      createdAt
      author {
        firstName
      }
    }
  }
`;

function App() {
  const [histogramData, setHistogramData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth - 24);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight - 24);
  const [isValid, setIsValid] = useState(false);
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
    Jan: '#00B0FF',
    Feb: '#F50057',
    Mar: '#00BFA6',
    Apr: '#FC427B',
    May: '#e67e22',
    Jun: '#be2edd',
    Jul: '#f9ca24',
    Aug: '#c7ecee',
    Sep: '#9b59b6',
    Oct: '#4cd137',
    Nov: '#00a8ff',
    Dec: '#F8EFBA',
  };

  useEffect(() => {
    if (!loading && !error) {
      const { allPosts } = data;

      setHistogramData(
        allPosts.map((item) => {
          const date = new Date(parseInt(item.createdAt));
          const month = date.toLocaleString('default', { month: 'short' });
          return {
            month: month,
            postCount: 1,
            title: item.title,
            author: item.author,
          };
        })
      );
    }

    if (!loading && !error && histogramData.length !== 0) {
      setIsValid(true);
    }

    function handleResize() {
      setWindowWidth(window.innerWidth - 24);
      setWindowHeight(window.innerHeight - 24);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loading, error, data, histogramData.length]);

  return (
    <>
      {loading && <h1>Loading ...</h1>}
      {isValid && (
        <>
          <Histogram
            monthlyData={histogramData}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            months={months}
            colorMap={colorMap}
          />

          <TotalPosts
            numberOfPosts={histogramData.length}
            posts={histogramData}
          />
        </>
      )}
    </>
  );
}

export default App;
