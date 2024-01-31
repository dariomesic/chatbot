class DataService {
  getSystems() {
    return fetch('http://18.194.27.183:8080/getSystems', {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    });
  }

  getNameForSystem(system_id){
    return fetch('http://18.194.27.183:8080/getNameForSystem?system_id=' + system_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  getIntentsForSystem(system_id) {
    return fetch('http://18.194.27.183:8080/getIntentsForSystem?system_id=' + system_id, {
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
    return fetch('http://18.194.27.183:8080/getNameForIntent?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  getConversationsForSystem(system_id){
    return fetch('http://18.194.27.183:8080/getConversationsForSystem?system_id=' + system_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  updateConversationTmp(uuid, system_id, intent_id, question, threshold, response){
    return fetch('http://18.194.27.183:8080/updateConversationTmp', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({uuid: uuid, system_id: system_id, intent_id: intent_id, question: question, threshold: threshold, response: response})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }
  
  getQuestionsForIntent(intent_id){
    return fetch('http://18.194.27.183:8080/getQuestionsForIntent?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  getThresholdsBySystemId(system_id){
    return fetch('http://18.194.27.183:8080/getThresholdsBySystemId?system_id=' + system_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  updateThresholdsBySystemId(system_id, percentage_upper, percentage_lower){
    return fetch('http://18.194.27.183:8080/updateThresholdsBySystemId?system_id=' + system_id + '&percentage_upper=' + percentage_upper + '&percentage_lower=' + percentage_lower, {
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
    return fetch('http://18.194.27.183:8080/postQuestion', {
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
    return fetch('http://18.194.27.183:8080/deleteQuestion?question_id=' + question_id, {
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
    return fetch('http://18.194.27.183:8080/addIntentForSystem?system_id=' + system_id, {
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
    return fetch('http://18.194.27.183:8080/deleteIntent?intent_id=' + intent_id + '&system_id=' + system_id, {
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
    return fetch('http://18.194.27.183:8080/updateIntent', {
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
    return fetch('http://18.194.27.183:8080/updateQuestion', {
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

  deleteQuestionsById(intent_id, system_id){
    return fetch('http://18.194.27.183:8080/deleteQuestionsById?intent_id=' + intent_id + '&system_id=' + system_id, {
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
    return fetch('http://18.194.27.183:8080/addRuleForIntent?intent_id=' + intent_id, {
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
    return fetch('http://18.194.27.183:8080/updateStep', {
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
    return fetch('http://18.194.27.183:8080/deleteStep?intent_id=' + intent_id, {
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
    return fetch('http://18.194.27.183:8080/getRulesForIntent?intent_id=' + intent_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  nextStep(response, conditions){
    return fetch('http://18.194.27.183:8080/nextStep', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({response: response, conditions: conditions})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  goToStep(intent_id,id){
    return fetch('http://18.194.27.183:8080/goToStep?intent_id=' + intent_id + '&id=' + id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  getSynonyms(system_id){
    return fetch('http://18.194.27.183:8080/getSynonyms?system_id=' + system_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  updateSynonyms(system_id, synonyms){
    return fetch('http://18.194.27.183:8080/updateSynonyms', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({system_id: system_id, synonyms: synonyms})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  getThemes(system_id){
    return fetch('http://18.194.27.183:8080/getThemes?system_id=' + system_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  updateThemes(system_id, intents){
    return fetch('http://18.194.27.183:8080/updateThemes', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({system_id: system_id, intents: intents})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  uploadDocument(formData){
    return fetch('http://18.194.27.183:8080/uploadDocument', {
      method : "POST",
      body: formData
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  getDocumentsBySystemId(system_id){
    return fetch('http://18.194.27.183:8080/getDocumentsBySystemId?system_id=' + system_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  searchDocuments(text){
    return fetch('http://18.194.27.183:8080/searchDocuments', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text: text})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  sendQuestions(questions, intent_id, questions_len){
    return fetch('http://18.194.27.183:8080/sendQuestions', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({questions: questions, intent_id: intent_id, questions_len: questions_len})
    })
  }

  reloadQuestions(system_id){
    return fetch('http://18.194.27.183:8080/reloadQuestions?&system_id=' + system_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  sendMessage(question, systemID, uuid){
    return fetch('http://18.194.27.183:8080/chatbotSentMessage', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({question: question, systemID: systemID, uuid: uuid})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  userResponse(conditions, intent_id, id, uuid, systemID, answer){
    return fetch('http://18.194.27.183:8080/chatbotUserResponse', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({conditions: conditions, intent_id: intent_id, id: id, uuid: uuid, systemID: systemID, answer: answer})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  thumbsUp(uuid, system_id, intent_id){
    return fetch('http://18.194.27.183:8080/thumbsUp?uuid=' + uuid + '&intent_id=' + intent_id + '&system_id=' + system_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  thumbsDown(uuid, system_id, intent_id){
    return fetch('http://18.194.27.183:8080/thumbsDown?uuid=' + uuid + '&intent_id=' + intent_id + '&system_id=' + system_id, {
      method : "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
  }

  sendMail(response, session_id, data, conditions, system_id){
    return fetch('http://18.194.27.183:8080/sendMail', {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({response: response, session_id: session_id, data: data, conditions: conditions, systemID: system_id})
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