import React from 'react';
import {Button, Collapse, Form, Input} from 'antd';

const {Panel} = Collapse;

const CreateQuiz = ({createQuiz}) => {
  let quizEndQuizDate="";
  let quizQuestion="";
  let quizGoodChoice="";
  let quizChoice2="";
  let quizChoice3="";
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

  return (
    <div>

      <h2>Créer un questionnaire</h2>
      <Collapse defaultActiveKey={['1']} ghost>
        <Panel header="Créer..." key="1">
          <form style={form} onSubmit={(event) => {
            event.preventDefault();

            const endQuizDate =  quizEndQuizDate;
            const question =  quizQuestion;
            const goodChoice =  quizGoodChoice;
            const choice2 = quizChoice2;
            const choice3 =  quizChoice3;
            createQuiz(endQuizDate, question, goodChoice, choice2, choice3);

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
                  quizEndQuizDate = event.target.value;
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
                  quizQuestion = event.target.value;
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
                  quizGoodChoice = event.target.value;
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
                  quizChoice2 = event.target.value;
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
                  quizChoice3 = event.target.value;
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

  </div>
  );
};

export default CreateQuiz;
