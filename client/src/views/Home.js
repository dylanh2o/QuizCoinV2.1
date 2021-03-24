import QuizCoin from '../contracts/QuizCoin';
import React, {useState, useEffect} from 'react';

import Main from '../components/Main';
import Web3 from 'web3';
import Loading from '../components/Loading';
import {useDispatch, useSelector} from 'react-redux';

import {setAccount} from '../store/appSlice';

const Home = () => {
  const dispatch = useDispatch();
  const {account} = useSelector(state => state.app);
  const [quizCoin, setQuizCoin] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buffer, setBuffer] = useState(null);

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await loadBlockchainData();
    })();
  }, []);


  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    dispatch(setAccount(accounts[0]));
    // Network ID
    // const networkId = await web3.eth.net.getId();
    const networkId = 5777;
    const networkData = QuizCoin.networks[networkId];
    //console.log(QuizCoin.networks[networkId]);
    if (networkData) {
      const qCoin = new web3.eth.Contract(QuizCoin.abi, networkData.address);
      setQuizCoin(qCoin);
      const qCount = await qCoin.methods.quizCount().call();

      // Load quiz
      for (var i = 1; i <= qCount; i++) {
        const quiz = await qCoin.methods.quizzes(i).call();
        setQuizzes(state => {
          return [...state, quiz];
        });
      }
      setLoading(false);
    } else {
      window.alert('QuizCoin contract not deployed to detected network.');
    }
  };

  const captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {

      setBuffer(Buffer(reader.result));
      console.log('buffer', buffer);
    };
  };

  const createQuiz = (endQuizDate, question, goodChoice, choice2, choice3) => {
    setLoading(true);
    quizCoin.methods.createQuiz(endQuizDate, question, goodChoice, choice2, choice3).send({from: account}, () => {
      setLoading(false);
    });
  };

  const sendChoice = (id, choice, winAmount) => {
    setLoading(true);
    const _author = quizzes[id - 1].author;
    const _goodChoice = (quizzes[id - 1].goodChoice);
    if (_goodChoice === choice) {
      quizCoin.methods.sendChoice(id).send({to: account, from: account, value: winAmount}, () => {
        setLoading(false);
      });
    } else {
      //bloque le contrats

      setLoading(false);

    }
  };
  console.log(quizzes);
  return (

    <div>

      {loading
        ? <Loading/>
        : <Main
          quizzes={quizzes}
          captureFile={captureFile}
          createQuiz={createQuiz}
          sendChoice={sendChoice}
        />
      }
    </div>
  );
};


export default Home;
