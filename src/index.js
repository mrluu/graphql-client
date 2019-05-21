import React, { Component } from 'react';
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

class Folders extends Component {
  onInputChange(e) {
    e.preventDefault();
    //console.log("UPDATE VALUE for ID: " + e.target.id + ": " + e.target.value);
    this.props.onChangeHandler(e.target.id, e.target.value);
  }

  render() {
    return(
      <Query
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
          if (loading)
            return <p>Loading...</p>;
          if (error)
            return <p>Error :(</p>;

          return data.folders.map(({ id, name }) => (
            <div key={id}>
              <label>{id}</label>
              <input type="text" id={id} defaultValue={name} onChange={(e) => {this.onInputChange(e);}}/>
            </div>
          ));
        }}
      </Query>
    );
  }
}

class App extends Component {
  update(e) {
    e.preventDefault();
    console.log(this.state);
    //TODO: Add GraphQL call to Mutate with the new name to test out the updateFolder mutation
  }

  setNewName(id, name) {
    console.log("NEW NAME FOR ID: " + id + ": " + name);
    let change = {};
    change[id] = name;
    this.setState(change);
  }

  render() {
    return(
      <ApolloProvider client={client}>
        <div>
          <h2>My first Apollo app 🚀</h2>
          <Folders onChangeHandler={(id, name) => {this.setNewName(id, name)}}/>
          <button onClick={(e) => {
            this.update(e);
          }}>
            Submit
          </button>
          <button>Cancel</button>
        </div>
      </ApolloProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
