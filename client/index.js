import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetails';
import Test from './components/Obs';


const client = new ApolloClient({
  dataIdFromObject: o => o.id // object -> takes every peice of data and runs it through this function
  //look at every single peice of data and use the id field off of that record to identify that peice of data
  //only works if ID is unique and ask for the id of all the data from the server
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList}/>
          <Route path="songs/new" component={SongCreate}/>
          <Route path="songs/:id" component={SongDetail}/>
          <Route path="test" component={Test}/>
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);

/**
 Apollo Store - is what is going to communicate directly with the graphical server and store data that comes back from it
 store of data that is on the client side
 client side repository of all the data that is coming from the graphql server
 not much setting up

 Apollo Provider - provider of data to our react app
 provider will take data from the store and inject it into our react application
 glue layer between Apollo store and react
 mass config is with provider

 GraphQL and React Strat
 1. Identify data required
 2. Write query in Graphiql (for practice) and in component file
 3. Bond query + component
 4. Access data

 How Apollo works with React
 Cold Cache
 Warm Cache - no refetch because it was fetched already (one time fetched)
 Does not know about updates, to refetch a list

 Apollo Store
 Song 2,3,4 - SongList
 When 5 is created, is not added into SongList
 Need to re run the query

 Pull Query from separate file

 Three ways to fetch and update list of data
 1. refetchQueries
 2. refetch
 3. 

 How Apollo Store stores data
 - has internal buckets of data
 - knows how to fetch data from server and store them accordingly in respective buckets
 Shortcomings:
 - Apollo has no idea what data and what properties exist in the buckets
 - does not know the relationship between component and data
 - has no way of identifying the records that are being retrieved by our graphql server
 Solution
 - by telling Apollo a little bit more about the id of every single record, Apollo can then bond with react side of our app
 Benefit
 - better than mutation refetch because number of request is lower
 - dev.apollodata.com/react/cache-updates.html
 -Fetch a list
 -Create something
 -Refetch list
 -Apollo sees list with id was updated
 -Apollo rerenders component
 */