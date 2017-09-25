axios.defaults.baseURL = 'http://localhost:3000';

let signIn = () => {
  const params = {
    username: 'user1',
    password: '123'
  }
  axios
    .post('/user/signIn', params)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}

let signUp = () => {
  const params = {
    username: 'user1',
    userphone: '123',
    password: '123',
    nickname: '321',
    userType: '商户'
  }
  axios
    .post('/user/signUp', params)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}

const uuid = '59be14663c33c746f9bf51b2_2'
let getUserInfo = () => {
  axios
    .get('/user/getUserInfo/' + uuid)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}

let setUserInfo = () => {
  const setUserInfParams = {
    useruuid: uuid,
    username: '',
    userphone: '你特么到底想要几个大傻逼',
    password: '',
    nickname: '第二个大傻逼',
    summary: '握草，干他',
    userImg: ''
  }
  axios
    .post('/user/setUserInfo', setUserInfParams)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}


let app = () => {
  return {
    init() {
      this.Controller();
    },
    Controller() {
      // signIn()
      signUp()
      // getUserInfo()
      // setUserInfo()
    }
  };
};

app().init();