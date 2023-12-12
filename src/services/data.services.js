/*class DataService {
  getSystems() {
    return fetch('https://18.194.27.183:8080/getSystems', {
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
    return fetch('https://18.194.27.183:8080/getNameForSystem?system_id=' + system_id, {
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
    return fetch('https://18.194.27.183:8080/getIntentsForSystem?system_id=' + system_id, {
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
    return fetch('https://18.194.27.183:8080/getNameForIntent?intent_id=' + intent_id, {
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
    return fetch('https://18.194.27.183:8080/getConversationsForSystem?system_id=' + system_id, {
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
    return fetch('https://18.194.27.183:8080/updateConversationTmp', {
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
    return fetch('https://18.194.27.183:8080/getQuestionsForIntent?intent_id=' + intent_id, {
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
    return fetch('https://18.194.27.183:8080/getThresholdsBySystemId?system_id=' + system_id, {
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
    return fetch('https://18.194.27.183:8080/updateThresholdsBySystemId?system_id=' + system_id + '&percentage_upper=' + percentage_upper + '&percentage_lower=' + percentage_lower, {
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
    return fetch('https://18.194.27.183:8080/postQuestion', {
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
    return fetch('https://18.194.27.183:8080/deleteQuestion?question_id=' + question_id, {
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
    return fetch('https://18.194.27.183:8080/addIntentForSystem?system_id=' + system_id, {
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
    return fetch('https://18.194.27.183:8080/deleteIntent?intent_id=' + intent_id + '&system_id=' + system_id, {
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
    return fetch('https://18.194.27.183:8080/updateIntent', {
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
    return fetch('https://18.194.27.183:8080/updateQuestion', {
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
    return fetch('https://18.194.27.183:8080/deleteQuestionsById?intent_id=' + intent_id, {
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
    return fetch('https://18.194.27.183:8080/addRuleForIntent?intent_id=' + intent_id, {
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
    return fetch('https://18.194.27.183:8080/updateStep', {
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
    return fetch('https://18.194.27.183:8080/deleteStep?intent_id=' + intent_id, {
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
    return fetch('https://18.194.27.183:8080/getRulesForIntent?intent_id=' + intent_id, {
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
    return fetch('https://18.194.27.183:8080/nextStep', {
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
    return fetch('https://18.194.27.183:8080/goToStep?intent_id=' + intent_id + '&id=' + id, {
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
    return fetch('https://18.194.27.183:8080/getSynonyms?system_id=' + system_id, {
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
    return fetch('https://18.194.27.183:8080/updateSynonyms', {
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

  sendQuestions(questions, intent_id, system_id){
    return fetch('https://18.194.27.183:8080/sendQuestions?questions=' + questions + '&intent_id=' + intent_id + '&system_id=' + system_id, {
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
    console.log(question, systemID, uuid)
    return fetch('/chatbotSentMessage', {
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
    return fetch('https://18.194.27.183:8080/chatbotUserResponse', {
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
    return fetch('https://18.194.27.183:8080/thumbsUp?uuid=' + uuid + '&intent_id=' + intent_id + '&system_id=' + system_id, {
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
    return fetch('https://18.194.27.183:8080/thumbsDown?uuid=' + uuid + '&intent_id=' + intent_id + '&system_id=' + system_id, {
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

  getNameForSystem(system_id){
    return fetch('/api/getNameForSystem?system_id=' + system_id, {
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

  getConversationsForSystem(system_id){
    return fetch('/api/getConversationsForSystem?system_id=' + system_id, {
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
    return fetch('/api/updateConversationTmp', {
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

  getThresholdsBySystemId(system_id){
    return fetch('/api/getThresholdsBySystemId?system_id=' + system_id, {
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
    return fetch('/api/updateThresholdsBySystemId?system_id=' + system_id + '&percentage_upper=' + percentage_upper + '&percentage_lower=' + percentage_lower, {
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

  nextStep(response, conditions){
    return fetch('/api/nextStep', {
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
    return fetch('/api/goToStep?intent_id=' + intent_id + '&id=' + id, {
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
    return fetch('/api/getSynonyms?system_id=' + system_id, {
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
    return fetch('/api/updateSynonyms', {
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

  sendQuestions(questions, intent_id, system_id){
    return fetch('/api/sendQuestions?questions=' + questions + '&intent_id=' + intent_id + '&system_id=' + system_id, {
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
    return fetch('/api/chatbotSentMessage', {
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
    return fetch('/api/chatbotUserResponse', {
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
    return fetch('/api/thumbsUp?uuid=' + uuid + '&intent_id=' + intent_id + '&system_id=' + system_id, {
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
    return fetch('/api/thumbsDown?uuid=' + uuid + '&intent_id=' + intent_id + '&system_id=' + system_id, {
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