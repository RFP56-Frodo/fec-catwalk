import React, { useState } from 'react';
import Error from './Error.jsx';
import axios from 'axios';

const AddQuestionModal = (props) => {

  const [state, setState] = useState ({
    name: '',
    email: '',
    question: '',
    error: false,
    msg: '',
  });

  const productId = props.id;

  // eslint-disable-next-line no-unused-vars
  const refresh = () => {
    props.getData();
  };

  // handle input changes

  const handleNameInput = (e) => {
    setState({
      ...state,
      name: e.target.value,
    });
  };

  const handleEmailInput = (e) => {
    setState({
      ...state,
      email: e.target.value,
    })


  };

  const handleQInput = (e) => {
    setState({
      ...state,
      question: e.target.value,
    });

  };

  // validation for the input

  const isValid = (property) => {
    let result = false;

    if (property === 'email') {
      if(state[property].indexOf('@') !== -1 && state[property].length > 5 && state[property].indexOf('.com') !== -1) {
        result = true;
      }
    } else if (state[property].length !== 0) {
      result = true;
    }

    return result;
  };

  // handle submit

  const handleSubmit = (e) => {
    e.preventDefault();

    let name = isValid('name');
    let email = isValid('email');
    let question = isValid('question');
    let error = [];

    if (!name) {
     error.push('Name');

    }
    if (!email) {
      error.push('email');
    }
    if (!question) {
      error.push('question body')
    }

    if (name && email && question) {
      //submit ok add question
      // let questionData = {
      //   question_body: state.question,
      //   asker_name: state.name,
      //   answers: [],
      //   question_helpfulness: 0,
      //   reported: false
      // };

      // props.addQ(questionData);
      // send this data to API
      let postObj = {
        body: state.question,
        name: state.name,
        email: state.email,
        product_id: props.id
      }

      axios.post(`/questions/${productId}`, postObj)
      .then(res => {
        console.log('add question ok', res);
        props.getData();
        props.close ();
      })
      .catch(err => console.log('add question err', err));

      // props.getData()

      // // close the window
      // props.close ();

    } else {
      setState({
        ...state,
        error: true,
        msg: error,
      });
    }
  }


  return (
    <div className='popup-modal' >
      <div className='popup-inner-modal' >
        <div>
          <button className='close-btn' onClick={props.close}>X</button>
        </div>
      <div className='modal-title'>
        <p>Ask Your Question</p>
        <p className='modal-subtitle'>Question about {props.name}</p>
      </div>
      <div className='modal-text'>
        <form onSubmit={handleSubmit}>
          <p>What is your nickname? *</p>
          <input onChange={handleNameInput} className='small-input' type='text' placeholder='Example: jackson11!'/>
          <p>For privacy reasons, do not use your full name or email address</p>
          <br></br>
          <p>Your email *</p>
          <input onChange={handleEmailInput} className='small-input' type='text' placeholder='Why did you like the product or not?'/>
          <p>For authentication reasons, you will not be emailed</p>
          <br></br>
          <p>Your Question *</p>
          <input className='large-input' onChange={handleQInput} type='text' placeholder='question body' />
          <br></br>
          {state.error && <Error msg={state.msg} />}
          <br></br>
          <input type='submit' value='submit'/>
          <input onClick={props.close} type='submit' value='cancel'/>
          <br></br>
        </form>
      </div>
      </div>
    </div>
  );
};


export default AddQuestionModal;