const serverAPI = 'http://h8.awtian.com:3000'
// const serverAPI = 'http://localhost:3000'

window.fbAsyncInit = function () {
  FB.init({
    appId: '389643448127142',
    // cookie: true,
    xfbml: true,
    version: 'v2.11'
  });
  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      localStorage.accessToken = response.authResponse.accessToken
      localStorage.userId      = response.authResponse.userID
      sendTokenToServer(localStorage.accessToken);
    }
    else {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("userId")
      localStorage.removeItem("jwt")
    }
  });
};

function sendTokenToServer(tokenFB) {
  axios.post(serverAPI + '/user', {token: tokenFB})
  .then(resp => {
    localStorage.token = resp.data.jwt
  })
  .catch(err => {
    console.log(err.message);
  })
};

var app = new Vue({
  el: '#app-h8gag',
  data: {
    posts: [],
    posting: {
      image : '',
      title : '',
    }
  },

  created() {
    this.getPosts()
  },

  methods: {
    getPosts() {
      axios.get(serverAPI + '/posts')
      .then(resp => {
        this.posts = resp.data.data
      })
    },
    submitMeme(){
      var memetitle = $('#memetitle').val()
      var data = new FormData();
      data.append('title', memetitle)
      data.append('image', document.getElementById('image').files[0])

      axios.post(serverAPI+ '/posts',
      data,
      {headers: {
        "Content-Type" : "multipart/form-data",
        "token": localStorage.token
      }})
      .then(resp => {
        this.getPosts()
        console.log('success posting');
      })
      .catch(err => {
        console.log(err);
    votes(post,status,i){
      let self = this
      console.log(status)
      console.log('masuk sini')
      axios.put(`http://localhost:3000/posts/${post._id}`, {
        status: status
      },{
        headers:{
          token:localStorage.getItem('token')
        }
      })
        .then(function (response) {
          console.log(response)
          console.log(status)
          if(response.data.add === true) {
            if (status === 'up') {
              self.posts[i].score +=2
            }
              self.posts[i].score--
          }

          // self.posts.forEach(el=>{
          //   if(el.id == post.id){
          //     el.score = response.data.data.score
          //   }
          // // })
          // console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    
      // submitData() {
      //   console.log('POSTING: ', JSON.stringify(this.posting));
      //   this.$http.post(serverAPI + '/posts', headers:{ token })
      //   .then(resp => {
      //     console.log(resp);
      //   })
      // }
  },

})
