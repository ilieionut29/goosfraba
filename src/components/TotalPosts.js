import React, { useState } from 'react';

const TotalPosts = ({ numberOfPosts, posts }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='box-number'>
      <h1>In 2019, a total of {numberOfPosts} posts were accumulated.</h1>

      <button onClick={(e) => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide all posts' : 'Show all posts'}
      </button>

      {isVisible &&
        posts.map((item, index) => {
          return (
            <div key={index} className='post-box'>
              <span className='title'>TITLE: {item.title}</span>
              <div>
                from {item.author.firstName} on {item.month}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TotalPosts;
