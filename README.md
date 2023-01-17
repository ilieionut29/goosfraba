this app require node version 14.18+

- I started by reading the apollo client documentation and how to fetch the data
- then I tried to console.log() the data recived, and I saw it's working as I expected
- I saw that i need to format the date and extract the month from all posts, i tried with moment.js library but I found another solution without any library
- after I already had all the necesaris data, I started by reading and playing with d3 library
- after I had the histogram, I started to customise a littel bit the histogram
- then I added the total posts component just for fun

The histogram is responsive, even if it is a little more difficult to read on mobile because I tried to focus on challenge not on design.

I'll be honest, I chose d3 after I tried for 2/3 hours to play with VISX, but I couldn't make it to work, and I decided to try d3, even though I liked what VISX offers more.

The whole task was a challenge because it is the first time when I need to  work with charts and graphql, I usually use mysql, but after many researches, stackoverflow power, I managed, I think, to do something beautiful.


Brief
Develop a JavaScript web application that fetches a relevantly-sized list of posts from out mock GraphQL API and displays a chart/histogram representing the number of posts created in each month of 2019. Our GraphQL endpoint can be found at https://fakerql.goosfraba.ro/graphql