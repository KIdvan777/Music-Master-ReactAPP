import React, {Component} from 'react';
import './App.css';
import {FormGroup,FormControl,InputGroup,Glyphicon} from 'react-bootstrap';
import Profile from './Profile.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null
    }
  }

  search(){
    console.log(this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q= ${this.state.query}&type=artist&limit=1`;
    var accessToken = 'BQAdOO2piXI3P2vYmndr4RXp8kFeDM1dIyH2aoJixVAPD_S9DdoJioBOqiE1ipq346fMXQiF9hsqSiqHavkJARAe5hP0ok2Dg92v0yeuskeR_vYvA4wXVTJJS7w46S7wwVNZzCeclGiGf8AQGRlk-yYGiQseVw&refresh_token=AQBDAsNqwmcGZklSbWB57vPi_R0_icXxBkVQPCKNqZ27CAcPHh5IL28wlc2_9RR7fqgf3paZUOkqDqy6aoQXloccEwxd5mvBnUJgFtjjiOVVvhHvnd4w2qUlVDmO2qLgSrQ'

    console.log( FETCH_URL);

    var myOptions = {
         method: 'GET',
         headers: {
           'Authorization': 'Bearer ' + accessToken
         },
         mode: 'cors',
         cache: 'default'
       };


    fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      console.log(artist);
      this.setState({artist});
    });
  }

  render(){
    return(
      <div className="App">
        <div
          className="App-title">
          Music master from App
        </div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              placeholder="Search for an Artists"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter'){
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={()=>this.search()}>
              <Glyphicon glyph="search">

              </Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Profile
          artist={this.state.artist}
        />
        <div className="Gallery">
          Gallery
        </div>
      </div>

    )
  }
}

export default App;

// import React, { Component } from 'react';
// class App extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       query: "", // my query
//       artist: null  // my response.
//     }
//   }
//
//   search() {
//     console.log('this.state', this.state);
//     const BASE_URL = 'https://api.spotify.com/v1/search?';
//     const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
//     var accessToken = 'BQCV1Ci-X5cNXqVMgPY9Op4-ESniw5ptXNIRH1GtXVictlA4BpFVHCXWzL8K7Edm-QHShJa-uzc5KyoNs1yoCi8-wTpaBesahLLUYrM58H2UiTQ_kgLM9u-pROFKJap6Gfe55omLJiF6EdyBPtJ3EgCKxE5pog'
//
//     var myOptions = {
//       method: 'GET',
//       headers: {
//         'Authorization': 'Bearer ' + accessToken
//       },
//       mode: 'cors',
//       cache: 'default'
//     };
//
//     fetch(FETCH_URL, myOptions)
//       .then(response => response.json())
//       .then(json => {
//         const artist = json.artists.items[0];
//         this.setState({ artist });
//       })
//
//   }
//
//   render() {
//
//     let artist = {
//       name: '',
//       followers: {
//         total: ''
//       }
//     };
//     if (this.state.artist !== null) {
//       artist = this.state.artist;
//     }
//
//     return (
//       // return JSX
//       <div className="container">
//         <hr />
//         <div className="col-lg-6">
//           <div className="input-group">
//             <input type="text"
//               onChange={event => { this.setState({ query: event.target.value }) }}
//             className="form-control" placeholder="Search for..." />
//             <span className="input-group-btn">
//               <button
//               onClick={()=> this.search()}
//                className="btn btn-default" type="button">Go!</button>
//             </span>
//           </div>
//         </div>
//         <hr />
//         <div>
//           <div> {artist.name}   </div>
//           <div> {artist.followers.total} </div>
//         </div>
//
//
//         </div>
//     )
//   }
// }
// export default App;
