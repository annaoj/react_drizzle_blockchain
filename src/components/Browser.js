import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import KittyCoreABI from '../contracts/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS } from '../config';
import KittySearchForm  from './KittySearchForm/KittySearchForm';
import KittyInformation from './KittyInformation/KittyInformation';
import { randomKittyGenerator } from '../utils/randomKittyGenerator'
import Loading from '../containers/Loading';

class Browser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      kittyGenes: '',
      kittyBirthDate: '',
      kittyGeneration: '',
      kittyImageUrl: '',
      error: null, 
      isFetching: false
    };
  }

  componentDidMount() {
    const web3 = new Web3(window.web3.currentProvider);

    // Initialize the contract instance
    const kittyContract = new web3.eth.Contract(
      KittyCoreABI,
      CONTRACT_ADDRESS,
    );

    // Add the contract to the drizzle store
    this.context.drizzle.addContract({
      contractName: CONTRACT_NAME,
      web3Contract: kittyContract,
    });
  }

  handleChangeOnIdField = () => {
    return e => this.setState({
      id: e.currentTarget.value
    });
  }

  getKitty(id) {
    const {contracts} = this.context.drizzle;
    if(contracts && (!contracts.CryptoKitties || !contracts.CryptoKitties.methods) ){
      return this.setState({ error: 
        {
          message: "There is a problem with connecting to the contract"}, 
          isFetching: false 
        }
        );
    }
    this.context.drizzle.contracts.CryptoKitties.methods.getKitty(id).call()
    .then(
      result => this.setState({
        id: id,
        kittyGenes: result[9],
        kittyGeneration: result[8],
        kittyBirthDate: new Date(result[5]*1000).toUTCString().slice(5,16),
        kittyImageUrl: `https://storage.googleapis.com/ck-kitty-image/${CONTRACT_ADDRESS}/${id}.svg`,
        isFetching: false,
        error: null
        })
      )
      .catch(error => {
        this.setState({ error, isFetching: false });
    });
  }

  generateRandomKitty = () => {
    this.setState({ isFetching: true });
    this.context.drizzle.contracts.CryptoKitties.methods.totalSupply().call()
    .then(
      result => this.getKitty(randomKittyGenerator(result))
    )
    .catch(error => {
      this.setState({ error, isFetching: false });
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.state;
      if (id && !isNaN(parseInt(id, 10))) {
        this.getKitty(parseInt(id, 10));
      }
    };

  render() {
    const {
      kittyGenes, kittyImageUrl, id, kittyGeneration, kittyBirthDate, error, isFetching
    } = this.state;
    
    if (this.state.isFetching)
    {
      return <Loading isFetching = {isFetching} />
    }

    return (
      <div className="browser">
          <div className="wrapper">
          <h1>Kitty Browser</h1>
          <KittySearchForm 
              handleChangeOnIdField ={this.handleChangeOnIdField}
              handleSubmit= {this.handleSubmit}
              id= {id}
              generateRandomKitty = {this.generateRandomKitty}
          />
          {!error && kittyGenes && kittyGeneration 
              && kittyImageUrl && kittyBirthDate && !isFetching && 
              <KittyInformation 
              kittyGenes ={kittyGenes}
              kittyGeneration={kittyGeneration}
              kittyImageUrl= {kittyImageUrl}
              kittyBirthDate={kittyBirthDate}
          />
          }
          {error && !error.message && <h3>Oop, something went wrong!</h3>}
          {
            error && error.message &&
            <div>
              <h3>Error</h3>
              <p className="errorMessage">{error.message}</p>
            </div>
          }
          </div>
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;
