import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    });
  }

  onFindPetsClick = event => {
    const type = this.state.filters.type
    let fetchURL = '';
    if (type === 'all') {
      fetchURL = '/api/pets';
    } else {
      fetchURL = `/api/pets?type=${type.toLowerCase()}`
    }

    fetch(fetchURL)
      .then(response => response.json())
      .then(petData => this.setState(
        { pets: petData }
      ));
  }

  onAdoptPet = id => {
    const petState = this.state.pets;
    let pet = this.state.pets.find(pet => pet.id === id);
    pet.isAdopted = true;

    this.setState({
      pets: petState
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
