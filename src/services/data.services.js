class DataService {
  getIntents() {
    return fetch('/api/getIntents', {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    });
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

  postQuestion(question, intent_id){
    return fetch('/api/postQuestion', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({question: question, intent_id: intent_id})
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
}
export default new DataService();
