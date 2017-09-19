import React, {Component} from 'react';
import './App.css';
import {FormGroup,FormControl,InputGroup,Glyphicon} from 'react-bootstrap';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search(){
    //console.log(this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q= ${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    //{id}/top-tracks
    var accessToken = 'BQBgdjntvOga94IR4FQ2CDrtZFQ0y2mfGSVQMr9tjmmiFN2PcxamaJozT9Rmo2YjINWsPiy32jVCL_TfI34fICNI2ENO9x8PuSw0fZWWo_5d3YL_pcyD3CZPLuMI2Xak6Xp6GQqiyxEnDfog_dDsLeD3KDv_fw'

    //console.log( FETCH_URL);

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
      //console.log(artist);
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        //console.log('artist\'s top tracks', json);
        const {tracks} = json;
        this.setState({tracks});
      })
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
        {
          this.state.artist !== null
          ?<div>
            <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
          </div>
          : <div></div>
        }

      </div>

    )
  }
}

export default App;
