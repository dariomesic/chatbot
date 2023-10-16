/*class DataService {
  getSystems() {
    return fetch('getSystems', {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    });
  }

  getIntentsForSystem(system_id) {
    return fetch('getIntentsForSystem?system_id=' + system_id, {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    });
  }

  getNameForIntent(intent_id){
    return fetch('/getNameForIntent?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }
  
  getQuestionsForIntent(intent_id){
    return fetch('/getQuestionsForIntent?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  postQuestion(question, intent_id, system_id){
    return fetch('/postQuestion', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({question: question, intent_id: intent_id, system_id: system_id})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  deleteQuestion(question_id){
    return fetch('/deleteQuestion?question_id=' + question_id, {
      method : "DELETE",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  addIntentForSystem(system_id){
    return fetch('/addIntentForSystem?system_id=' + system_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  deleteIntent(intent_id, system_id){
    return fetch('/deleteIntent?intent_id=' + intent_id + '&system_id=' + system_id, {
      method : "DELETE",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  updateIntent(new_intent, intent_id){
    return fetch('/updateIntent', {
      method : "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({new_intent: new_intent, intent_id : intent_id})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  updateQuestion(new_question, question_id){
    return fetch('/updateQuestion', {
      method : "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({new_question: new_question, question_id : question_id})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  deleteQuestionsById(intent_id){
    return fetch('/deleteQuestionsById?intent_id=' + intent_id, {
      method : "DELETE",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  addRuleForIntent(intent_id){
    return fetch('/addRuleForIntent?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  updateRule(new_step, intent_id){
    return fetch('/updateStep', {
      method : "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({new_step: new_step, intent_id : intent_id})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  deleteStep(intent_id){
    return fetch('/deleteStep?intent_id=' + intent_id, {
      method : "DELETE",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  getRulesForIntent(intent_id){
    return fetch('/getRulesForIntent?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  sendQuestions(questions, intent_id){
    return fetch('/sendQuestions?questions=' + questions + '&intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  sendMessage(question){
    return fetch('/chatbotSentMessage', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({question: question})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  userResponse(conditions, intent_id){
    return fetch('/chatbotUserResponse', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({conditions: conditions, intent_id: intent_id})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  thumbsUp(intent_id){
    return fetch('/thumbsUp?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  thumbsDown(intent_id){
    return fetch('/thumbsDown?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }
}
export default new DataService()*/
class DataService {
  getSystems() {
    return fetch('/api/getSystems', {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    });
  }

  getIntentsForSystem(system_id) {
    return fetch('/api/getIntentsForSystem?system_id=' + system_id, {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    });
  }

  getNameForIntent(intent_id){
    return fetch('/api/getNameForIntent?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }
  
  getQuestionsForIntent(intent_id){
    return fetch('/api/getQuestionsForIntent?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  postQuestion(question, intent_id, system_id){
    return fetch('/api/postQuestion', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({question: question, intent_id: intent_id, system_id: system_id})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  deleteQuestion(question_id){
    return fetch('/api/deleteQuestion?question_id=' + question_id, {
      method : "DELETE",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  addIntentForSystem(system_id){
    return fetch('/api/addIntentForSystem?system_id=' + system_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  deleteIntent(intent_id, system_id){
    return fetch('/api/deleteIntent?intent_id=' + intent_id + '&system_id=' + system_id, {
      method : "DELETE",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  updateIntent(new_intent, intent_id){
    return fetch('/api/updateIntent', {
      method : "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({new_intent: new_intent, intent_id : intent_id})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  updateQuestion(new_question, question_id){
    return fetch('/api/updateQuestion', {
      method : "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({new_question: new_question, question_id : question_id})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  deleteQuestionsById(intent_id){
    return fetch('/api/deleteQuestionsById?intent_id=' + intent_id, {
      method : "DELETE",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  addRuleForIntent(intent_id){
    return fetch('/api/addRuleForIntent?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  updateRule(new_step, intent_id){
    return fetch('/api/updateStep', {
      method : "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({new_step: new_step, intent_id : intent_id})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  deleteStep(intent_id){
    return fetch('/api/deleteStep?intent_id=' + intent_id, {
      method : "DELETE",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  getRulesForIntent(intent_id){
    return fetch('/api/getRulesForIntent?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  sendQuestions(questions, intent_id){
    return fetch('/api/sendQuestions?questions=' + questions + '&intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  sendMessage(question){
    return fetch('/api/chatbotSentMessage', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({question: question})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  userResponse(conditions, intent_id){
    return fetch('/api/chatbotUserResponse', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({conditions: conditions, intent_id: intent_id})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  thumbsUp(intent_id){
    return fetch('/api/thumbsUp?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  thumbsDown(intent_id){
    return fetch('/api/thumbsDown?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }
}
export default new DataService()