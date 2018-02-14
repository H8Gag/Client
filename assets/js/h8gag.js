const serverAPI = 'http://localhost:3000'

// window.fbAsyncInit = function () {
//   var token = localStorage.getItem('accessToken')
//   console.log('token: ', token);
//
//   // if (token != null) {
//   // 	$(window).attr('location', '/index.html')
//   // }
//   // else {
//     FB.init({
//       appId: '389643448127142',
//       // cookie: true,
//       xfbml: true,
//       version: 'v2.11'
//     });
//     FB.AppEvents.logPageView();
//   // }
// };
//
// (function (d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
//
// function checkLoginState() {
//   FB.getLoginStatus(function (response) {
//     if (response.status === 'connected') {
//       localStorage.accessToken = response.authResponse.accessToken
//       localStorage.userId      = response.authResponse.userID
//       console.log('accessToken: ', response.authResponse.accessToken);
//       sendTokenToServer(response.authResponse.accessToken);
//     }
//     else {
//       localStorage.removeItem("accessToken")
//       localStorage.removeItem("userId")
//       localStorage.removeItem("jwt")
//     }
//   });
// };
//
// function sendTokenToServer(token) {
//   $.ajax({
//     type: 'GET',
//     url: serverAPI + '/user',
//     headers: { access_token: token },
//     success: function (resp) {
//       FB.logout(function (response) {
//         localStorage.jwt = resp.token
//         // $(window).attr('location', '/index.html')
//       });
//     },
//     error: function (error) {
//       console.error('Failed to login with Facebook', error);
//     }
//   })
// };

var app = new Vue({
  el: '#app-h8gag',
  data: {
    posts: [],
  },

  created() {
    this.getPosts()
  },

  methods: {
    getPosts() {
      axios.get('http://server.wizawt.com:3000/posts')
      .then(resp => {
        // console.log(resp.data.data[0].image);
        let arrData = []
        let datas = resp.data.data
        datas.map(data => {
          // console.log(data._id);
          var div = `<div class="animate-box">
              <a :href="post.image" class="image-popup fh5co-board-img">
                <img src="${data.image}" alt="">
              </a>
              <div class="fh5co-desc">${data.title}</div>
            </div>`
          arrData.push(div)
          // arrData.push({
          //   id: data._id,
          //   title : data.title,
          //   image: require(data.image),
          // })
        })
        // console.log(arrData);

        // this.posts = arrData
        this.posts = resp.data.data
      })
    }
  },

  mounted() {
    // window.fbAsyncInit = function() {
    //     this.checkLogged();
    //     FB.init({
    //       appId     : '389643448127142',
    //       cookie    : true,
    //       xfbml     : true,
    //       version   : 'v2.11'
    //     });
    //     FB.AppEvents.logPageView();
    //   };

      // (function(d, s, id){
      //    var js, fjs = d.getElementsByTagName(s)[0];
      //    if (d.getElementById(id)) {return;}
      //    js = d.createElement(s); js.id = id;
      //    js.src = "//connect.facebook.net/en_US/sdk.js";
      //    fjs.parentNode.insertBefore(js, fjs);
      //  }(document, 'script', 'facebook-jssdk'));

  }

})
