import QuizCoin from '../contracts/QuizCoin'
import React, { Component } from 'react';

import Main from '../components/Main'
import Web3 from 'web3';
import Loading from '../components/Loading';
import Nav from '../components/Nav';

class Home extends Component {
async componentWillMount() {
  await this.loadWeb3();
  await this.loadBlockchainData();
}

async loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

async loadBlockchainData() {
  const web3 = window.web3;
  // Load account
  const accounts = await web3.eth.getAccounts();
  this.setState({ account: accounts[0] });
  // Network ID
  // const networkId = await web3.eth.net.getId();
  const networkId=5777;
  const networkData = QuizCoin.networks[networkId];
  //console.log(QuizCoin.networks[networkId]);
  if(networkData) {
    const quizCoin = new web3.eth.Contract(QuizCoin.abi, networkData.address);
    this.setState({ quizCoin });
    const quizzesCount = await quizCoin.methods.quizCount().call();
    this.setState({ quizzesCount });
    // Load quiz
    for (var i = 1; i <= quizzesCount; i++) {
      const quiz = await quizCoin.methods.quizzes(i).call();

      this.setState({
        quizzes: [...this.state.quizzes, quiz]
      })
    }
    this.setState({ loading: false})
  } else {
    window.alert('QuizCoin contract not deployed to detected network.')
  }
}

captureFile = event => {
  event.preventDefault();
  const file = event.target.files[0];
  const reader = new window.FileReader();
  reader.readAsArrayBuffer(file);

  reader.onloadend = () => {
    this.setState({ buffer: Buffer(reader.result) });
    console.log('buffer', this.state.buffer)
  }
};

createQuiz = (endQuizDate,question,goodChoice,choice2, choice3) => {
  this.setState({ loading: true });
  this.state.quizCoin.methods.createQuiz(endQuizDate,question,goodChoice,choice2, choice3).send({ from: this.state.account},()=>{
    this.setState({ loading: false })
  }) ;
};

sendChoice(id,choice, winAmount) {
  this.setState({ loading: true });
  const _author=this.state.quizzes[id-1].author;
  const _goodChoice=(this.state.quizzes[id-1].goodChoice);
  if(_goodChoice===choice){
    this.state.quizCoin.methods.sendChoice(id).send({ to:this.state.account, from: this.state.account, value: winAmount } ,()=> {
      this.setState({ loading: false })
    })
  }else{
    //bloque le contrats

    this.setState({ loading: false })

  }

}

constructor(props) {
  super(props);
  this.state = {
    account: '',
    quizCoin: null,
    quizzes: [],
    loading: true
  };

  this.createQuiz = this.createQuiz.bind(this);
  this.sendChoice = this.sendChoice.bind(this);
  this.captureFile = this.captureFile.bind(this);
}

  render() {
    return (

      <div>

        { this.state.loading
          ? <Loading/>
          : <Main
            quizzes={this.state.quizzes}
            captureFile={this.captureFile}
            createQuiz={this.createQuiz}
            sendChoice={this.sendChoice}
          />
        }
      </div>
    );
  }
}

export default Home;
