interface History {
  [key: string]: string;
}

interface ConversationBaseForm {
  modelNo: number;
  conversationNo: number;
  conversationText: string;
  question: string;
  modelName: string;
  history: History[];
}

interface ConversationVoiceForm extends ConversationBaseForm {
  eleVoiceId: string;
}

interface ConversationVideoForm extends ConversationBaseForm {
  heyVoiceId: string;
  avatarId: string;
}

interface ConversationResponse {
  answer: string;
  url: string;
}

export {
  ConversationVoiceForm,
  ConversationVideoForm,
  ConversationResponse,
  History,
};