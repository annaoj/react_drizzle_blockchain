# Kitty Browser

[CryptoKitties](http://cryptokitties.co) is one of the most popular distributed apps on the Ethereum Network. It's a game that allows players to purchase, collect, breed and sell various types of virtual cats.


# Requirements 

- Given the address for the CryptoKitties Smart Contract: `0x06012c8cf97bead5deae237070f9587f8e7a266d` Find its *ABI* (You will need it to complete the challenge)
- Build a simple UI where the user can type in an ID and display the following information about a Kitty:
  - Genes
  - Birth time
  - Generation



# Setting up your dev environment

- Install and setup Metamask in your browser
- Clone this repo, to be used as a starting point for your solution
- Install the dependencies and run the development server


### containers/Loading.js

Shows a Loading message while drizzle is being initialized or an error message if the browser is not *web3 enabled*

```Javascript
if (window.web3 === undefined || this.props.web3.status === 'failed') {
      return(
        // Display a web3 warning.
        <div className="warning">
          <p>This browser has no connection to the Ethereum network. </p>
          <p>Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
        </div>
      );
    }

    if (this.props.drizzleStatus.initialized) {
      // Load the dapp.
      return Children.only(this.props.children);
    }

    return(
      // Display a loading indicator.
      <div className="loading">
        <h1>Loading dapp...</h1>
        <img src="https://www.cryptokitties.co/images/loader.gif" width="120" alt="loading" />
      </div>
    );
```

## App.js

Initializes the `DrizzleProvider` and wraps your app with the `Loading` component.

```Javascript
class App extends Component {
  render() {
    const drizzleOptions = {
      contracts: []
    };

    return (
      <DrizzleProvider options={drizzleOptions}>
        <Loading>
          <Browser />
        </Loading>
      </DrizzleProvider>
    );
  }
}
```

