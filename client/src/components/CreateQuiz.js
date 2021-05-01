import React from 'react';
import {Button, Collapse, DatePicker, Form, Input, Space} from 'antd';

const {Panel} = Collapse;


const {RangePicker} = DatePicker;
const CreateQuiz = ({createQuiz}) => {
  let quizEndQuizDate = '';
  let quizQuestion = '';
  let quizGoodChoice = '';
  let quizChoice2 = '';
  let quizChoice3 = '';
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
  const marginTitle = {
    marginRight: '20vw',
    marginLeft: '20vw',

  };


  return (

    <div>

      <h2 style={marginTitle}>Créer un questionnaire</h2>
      <Collapse defaultActiveKey={['0']} ghost>
        <Panel header="Créer..." key="1" style={marginTitle}>
          <form style={form} onSubmit={(event) => {
            event.preventDefault();
            const endQuizDate = quizEndQuizDate;
            const question = quizQuestion;
            const goodChoice = quizGoodChoice;
            const choice2 = quizChoice2;
            const choice3 = quizChoice3;
            console.log(quizEndQuizDate);
            createQuiz(endQuizDate, question, goodChoice, choice2, choice3);

          }}>


            <Form.Item
              label="Question:"
              name="question"
              style={formInput}
            >
              <Input
                id="Question"
                type="text"
                onChange={event => {
                  quizQuestion = event.target.value;
                }}
                style={inputStyle}
                placeholder="Question..."
                required/>
            </Form.Item>


            <Form.Item
              label="Bonne réponse:"
              name="goodChoice"
              style={formInput}
            >
              <Input
                id="GoodChoice"
                type="text"
                onChange={event => {
                  quizGoodChoice = event.target.value;
                }}
                style={inputStyle}
                placeholder="Bonne réponse..."
                required/>
            </Form.Item>


            <Form.Item
              label="Choix numéro 2:"
              name="choice2"
              style={formInput}
            >
              <Input
                id="Choice2"
                type="text"
                onChange={event => {
                  quizChoice2 = event.target.value;
                }}
                style={inputStyle}
                placeholder="Choix 2..."
                required/>
            </Form.Item>


            <Form.Item
              label="Choix numéro 3:"
              name="choice3"
              style={formInput}
            >
              <Input
                id="Choice3"
                type="text"
                onChange={event => {
                  quizChoice3 = event.target.value;
                }}
                style={inputStyle}
                placeholder="Choix 3..."
                required/>
            </Form.Item>
            <Form.Item
              label="Date & heure de fin du questionnaire"
              name="endQuizDate"
              style={formInput}
            >

              <DatePicker style={inputStyle} showTime placeholder="Date & heure de fin..." onChange={value => {
                let preTimeStamp = Date.parse(value);
                let timeStamp = preTimeStamp / 1000;
                quizEndQuizDate = timeStamp;
              }} onOk={value => {
                let preTimeStamp = Date.parse(value);
                let timeStamp = preTimeStamp / 1000;
                quizEndQuizDate = timeStamp;
              }}/>


            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" style={inputSubmit}>
                Créer !
              </Button>
            </Form.Item>


          </form>
        </Panel>

      </Collapse>,

    </div>
  );
};

export default CreateQuiz;
