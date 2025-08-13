const createQuestion = `mutation CreateQuestion($input: CreateQuestionInput!) {
        createQuestion(input: $input) {
          title
          content
          tags
          AttachedFiles
          AttachedMedia
        }
      }`;
const SEND_OTP_MUTATION = `
  mutation StudentSignup($sendOtpInput: SendOtpInput!) {
    sendOtp(input: $sendOtpInput) {
      success
      userId
      phoneNumber
    }
  }
`;
const STUDENT_SIGNUP_MUTATION = `
  mutation StudentSignup($input: StudentSignupInput!) {
    studentSignup(input: $input) {
      userType
      success
    }
  }
`;
export {STUDENT_SIGNUP_MUTATION, SEND_OTP_MUTATION, createQuestion};