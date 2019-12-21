import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';

import {
  Container,
  DashHeader,
  QuestionList,
  ListHeader,
  QuestionInfo,
} from './styles';

export default function ListQuestions() {
  const [questions, setQuestions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [questionBody, setQuestionBody] = useState({});

  async function loadQuestions() {
    const response = await api.get('/questions');
    setQuestions(response.data);
  }

  useEffect(() => {
    loadQuestions(questions);
  }, [questions]);

  function handleAnswer(question) {
    setVisible(true);
    setQuestionBody(question);
  }

  async function handleSubmit(data) {
    try {
      await api.put(`/questions/${questionBody.id}/answer`, data);

      setVisible(false);
      loadQuestions(questions);
      toast.success('Resposta cadastrada com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error(
          `${err.response.data.error}. Ocorreu um erro e não foi possível realizar o cadastro. Verifique os dados.`
        );
      }
    }
  }

  return (
    <Container visible={visible}>
      <DashHeader>
        <strong> Pedidos de auxílio</strong>
      </DashHeader>
      {questions.length > 0 ? (
        <QuestionList>
          <ListHeader>
            <div className="title">
              <strong>ALUNO</strong>
            </div>
            <div className="blank">
              <strong />
            </div>
          </ListHeader>
          {questions.map(question => (
            <QuestionInfo key={question.id}>
              <div className="title">
                <span>{question.student.name}</span>
              </div>
              <div id="action" className="blank">
                <button
                  type="button"
                  id="edit"
                  onClick={() => handleAnswer(question)}
                >
                  responder
                </button>
              </div>
            </QuestionInfo>
          ))}
        </QuestionList>
      ) : (
        <QuestionList>
          <strong id="no-content">
            Não há pedidos de auxílio sem resposta.
          </strong>
        </QuestionList>
      )}

      {visible ? (
        <div id="answerBox" visible={visible}>
          <strong>PERGUNTA DO ALUNO</strong>
          <span>{questionBody.question}</span>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="answer">
              <strong>SUA RESPOSTA</strong>
            </label>
            <Input className="short" id="answer" name="answer" multiline />
            <button type="submit">Responder aluno</button>
          </Form>
        </div>
      ) : null}
    </Container>
  );
}
