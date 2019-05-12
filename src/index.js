import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import firebase, {auth, db} from "./firebase";

const foldersRef = firebase.database().ref('folders');

const client = new ApolloClient({
  uri: "https://us-central1-graphql-sample.cloudfunctions.net/api/graphql",
});

function test2() {
  foldersRef.once('value')
    .then(snapshot => {
      const folders = snapshot.val();
      if (folders === null) return [];
      //console.log(Object.keys(folders));
      return Object.keys(folders).map(o => {
        //console.log(o);
        //console.log(folders[o]);
        let target = Object.assign({ id: o }, folders[o]);
        console.log(target);
        return target;
      });
    });
}

function test() {
  var collectionRef = db.collection("folders");

  collectionRef.get().then((results) => {
    console.log("RESULTS size: " + results.size);

    if (results.size > 0) {
      //console.log(Object.keys(results.docs));
      results.docs.map(doc => {
          let target = Object.assign({id: doc.id}, {name: doc.data().name});
          console.log(target);
          return target;
      });
    }
  });
}

const Folders = () => (


    <h2>
    Test
    {
      /*test2()*/

    }
    {
      /*test()*/
    }

    { <Query
    query={gql`
      {
        folders {
          id
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.folders.map(({ id, name }) => (
        <div key={id}>
          <p>
            {id}: {name}
          </p>
        </div>
      ));
    }}
  </Query> }

  </h2>
);


const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
      <Folders />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
