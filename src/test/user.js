axios.defaults.baseURL = 'http://192.168.212.60:3333/api';

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
    userType: '用户'
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
  const uuid = '599f99f2f7ca72710fbc9b67_2'
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
    useruuid: '599f99f2f7ca72710fbc9b67_2',
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
      signIn()
      // signUp()
      // getUserInfo()
      // setUserInfo()
    }
  };
};

app().init();