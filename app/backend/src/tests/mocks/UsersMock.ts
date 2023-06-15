const validSequelizeUser = {
  id: 1,
  username: "user",
  email: "emailValido@gmail.com",
  password: "senhaCorreta",
  role: "user"
  }

const validUser = {
    email: 'emailValido@gmail.com',
    password: 'senhaCorreta'
  }
  
const invalidUser = {
    email: 'emailValido@gmail.com',
    password: 'senhaIncorreta'
  }
  
const userWithoutPassword = {
    email: 'emailValido@gmail.com'
  }
  
const userWithoutEmail = {
    password: '123456'
  }
  
const userWithInvalidEmail = {
    email: 'emailInvalido.br',
    password: '123456'
  }
  
const userWithInvalidPassword = {
    email: 'emailInvalido.br',
    password: '12345'
  }

  export { 
    validSequelizeUser,
    validUser, 
    invalidUser,
    userWithInvalidEmail, 
    userWithInvalidPassword, 
    userWithoutEmail, 
    userWithoutPassword }