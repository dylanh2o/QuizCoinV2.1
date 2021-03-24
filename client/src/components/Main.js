import React, {Component} from 'react';
import Identicon from 'identicon.js';
import {Button,Collapse, Form, Input} from 'antd';
const { Panel } = Collapse;

class Main extends Component {

  mixChoices = (goodChoice, choice2, choice3) => {
    let choices = [];
    choices.push(goodChoice);
    choices.push(choice2);
    choices.push(choice3);
    choices.sort(() => Math.random() - 0.5);

    return choices;
  };
  transformDate = (timestamp) => {
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

  render() {
    let arrayChoice;
    let time;

    const form = {
      weight: '100vw',
      padding: '20px',
      alignItems: 'center',

    };
    const formInput = {
      width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      borderWidth: '1px',
      boxSizing: 'border-box'
    };
    const inputStyle = {
      borderWidth: '1px',
      borderColor: '#000',
      borderStyle: 'solid',
      borderRadius: '4px',


    };
    const inputSubmit = {
      width: '100%',
      backgroundColor: '#000',
      color: 'white',
      padding: '14px 20px',
      margin: '8px 0',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    const hide = {
      display: "none"
    };
    const small = {
      fontSize: "small"
    };
    const bold = {
      fontWeight: "bold"
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
      fontWeight: "bold",
      fontSize: "large",
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center'

    };
    const centerButton = {

      display: "flex",
      justifyContent: 'center',
      alignItems: 'center'
    };
    return (
      <div>
        <h2>Créer un questionnaire</h2>
        <Collapse defaultActiveKey={['1']} ghost>
          <Panel header="Créer..." key="1">
            <form style={form} onSubmit={(event) => {
              event.preventDefault();
              const endQuizDate = this.quizEndQuizDate;
              const question = this.quizQuestion;
              const goodChoice = this.quizGoodChoice;
              const choice2 = this.quizChoice2;
              const choice3 = this.quizChoice3;
              this.props.createQuiz(endQuizDate, question, goodChoice, choice2, choice3);

            }}>

              <Form.Item
                label="Fin du questionnaire"
                name="endQuizDate"
                style={formInput}
              >
                <Input
                  id="EndQuizDate"
                  type="uint256"
                  onChange={event => {
                    this.quizEndQuizDate = event.target.value;
                  }}
                  style={inputStyle}
                  placeholder="Fin du questionnaire"
                  required/>
              </Form.Item>


              <Form.Item
                label="Question"
                name="question"
                style={formInput}
              >
                <Input
                  id="Question"
                  type="text"
                  onChange={event => {
                    this.quizQuestion = event.target.value;
                  }}
                  style={inputStyle}
                  placeholder="Question..."
                  required/>
              </Form.Item>



              <Form.Item
                label="Bonne réponse"
                name="goodChoice"
                style={formInput}
              >
                <Input
                  id="GoodChoice"
                  type="text"
                  onChange={event => {
                    this.quizGoodChoice = event.target.value;
                  }}
                  style={inputStyle}
                  placeholder="Bonne réponse..."
                  required/>
              </Form.Item>



              <Form.Item
                label="choix numéro 2"
                name="choice2"
                style={formInput}
              >
                <Input
                  id="Choice2"
                  type="text"
                  onChange={event => {
                    this.quizChoice2 = event.target.value;
                  }}
                  style={inputStyle}
                  placeholder="choix 2..."
                  required/>
              </Form.Item>



              <Form.Item
                label="choix numéro 3"
                name="choice3"
                style={formInput}
              >
                <Input
                  id="Choice3"
                  type="text"
                  onChange={event => {
                    this.quizChoice3 = event.target.value;
                  }}
                  style={inputStyle}
                  placeholder="choix 3..."
                  required/>
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" style={inputSubmit}>
                  Créer !
                </Button>
              </Form.Item>


            </form>
          </Panel>

        </Collapse>,



        {this.props.quizzes.map((quiz, key) => {

          return (

            <div key={key}     style={form}>
              <h2>Questionnaire disponible</h2>
              <div >
                <img

                  width='30'
                  height='30'
                  alt="identicon"
                  src={`data:image/png;base64,${new Identicon(quiz.author, 30).toString()}`}
                />
              </div>

              <div style={hide}>{time = this.transformDate(quiz.endQuizDate)}
              </div>

              <div style={small}>Le questionnaire se termine le {time}</div>
              <div style={bold}>Question:</div>


              <div style={question}>{quiz.question}</div>

              <div style={hide}>{arrayChoice = this.mixChoices(quiz.goodChoice, quiz.choice2, quiz.choice3)} </div>
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
                  this.props.sendChoice(event.target.name, event.target.value, winAmount);
                }}
              >
                {arrayChoice[2]}
              </button>
</div>
            </div>
          );
        })}

      </div>

    );
  }
}

export default Main;
