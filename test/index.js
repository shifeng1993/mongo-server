axios.defaults.baseURL = 'http://localhost:3333/api';

let signIn = () => {
  const params = {
    username: 'admin',
    password: '3213'
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
    username: 'admin',
    userphone: '123',
    password: '3213',
    nickname: '321'
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

let getUserInfo = () => {
  const uuid = '599e7434cf38e838c6b207c7'
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
    useruuid: '599e7434cf38e838c6b207c7',
    username: '',
    userphone: '',
    password: '',
    nickname: '大傻逼',
    summary: '',
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
      this.user()
    },
    user() {
      // signIn(),
      // signUp(),
      // getUserInfo(),
      setUserInfo()
    }
  };
};

app().init();