import React, {Component} from 'react';
import Identicon from 'identicon.js';
import CreateQuiz from './CreateQuiz';
import {useSelector} from 'react-redux';


const Main = ({quizzes,createQuiz,sendChoice}) => {
  const dataProfil = useSelector(state => state.app.user);
  const {account} = useSelector(state => state.app);
 const professor = dataProfil.professor;
  console.log(dataProfil);

  const mixChoices = (goodChoice, choice2, choice3) => {
    let choices = [];
    choices.push(goodChoice);
    choices.push(choice2);
    choices.push(choice3);
    choices.sort(() => Math.random() - 0.5);

    return choices;
  };
  const transformDate = (timestamp) => {
    var a = new Date(timestamp * 1000);
    var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Dàcemnre'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (min < 10) {
      min = '0' + min;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  };

let passQuiz=0;
    let arrayChoice;
    let time;


    const formQuestion = {
      weight: '100vw',
      padding: '20px',
      alignItems: 'center',
      border: 'solid 1px black',
      margin: '5px',

    };


    const hide = {
      display: 'none'
    };
    const small = {
      fontSize: 'small'
    };
    const bold = {
      fontWeight: 'bold'
    };
    const inputChoice = {
      backgroundColor: '#000',
      color: 'white',
      padding: '10px 20px',
      margin: '8px 5px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    };
    const question = {
      fontWeight: 'bold',
      fontSize: 'large',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'

    };
    const centerButton = {

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    const containerQuestion = {
      display: "flex",
    justifyContent: "center",
      flexWrap: "wrap"
    };
    return (
      <div>


        {professor === true ? (
          <CreateQuiz createQuiz={createQuiz} />
        ) : (
    null
        )}




        <h2>Questionnaire disponible</h2>
        <div style={containerQuestion}>
          {quizzes.map((quiz, key) => {

            return (
<div>
  {quiz.author != account ? (
    <div key={key} style={formQuestion}>


      <h2>Questionnaire {key + 1 -passQuiz}</h2>
      <div>
        <img

          width='30'
          height='30'
          alt="identicon"
          src={`data:image/png;base64,${new Identicon(quiz.author, 30).toString()}`}
        />
      </div>

      <div style={hide}>{time = transformDate(quiz.endQuizDate)}
      </div>

      <div style={small}>Le questionnaire se termine le {time}</div>
      <div style={bold}>Question:</div>


      <div style={question}>{quiz.question}</div>

      <div style={hide}>{arrayChoice = mixChoices(quiz.goodChoice, quiz.choice2, quiz.choice3)} </div>
      <div style={centerButton}>
        <button
          style={inputChoice}
          name={quiz.idQuiz}
          onClick={(event) => {
          }}
        >
          {arrayChoice[0]}
        </button>

        <button
          style={inputChoice}
          name={quiz.idQuiz}
          onClick={(event) => {
          }}
        >
          {arrayChoice[1]}
        </button>

        <button
          style={inputChoice}
          name={quiz.idQuiz}
          value={arrayChoice[2]}
          onClick={(event) => {
            let winAmount = window.web3.utils.toWei('0.1', 'Ether');
            sendChoice(event.target.name, event.target.value, winAmount);
          }}
        >
          {arrayChoice[2]}
        </button>
      </div>
    </div>
  ) : (
  <div   style={hide}> {passQuiz++}</div>
  )}


</div>
            );
          })}
        </div>
     </div>

    );

}

export default Main;
