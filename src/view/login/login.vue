<style lang="less">
  @import './login.less';
</style>
<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip" @click="signButtonShow()">欢迎您</p>
        </div>
      </Card>
    </div>
    <div class="sign-up" @click="signUp()" ref="sign">注册</div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data(){
    return {
      showCount:0
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    },
    signUp(){
      const password='1',
            userName='吴同岳';
        
        this.$axios.post('https://admin.coral3.com/admin/public/api/register',{
            userName:userName,
            password:password,
            access:'super_admin',
            avatar:'https://www.coral3.com/ds/img/test.gif'
        })
        .then(res=>{
          const userMsg=res.data;
          if(userMsg.status==200){
            this.handleSubmit({userName , password});
            this.$refs.sign.style.display='block';
          }else{
            alert(userMsg.msg);
          }
          console.log(userMsg)
        })
    },
    signButtonShow(){
      this.showCount++;
      if(this.showCount==6){
          this.$refs.sign.style.display='block';
      }
    }
  }
}
</script>

<style>
.sign-up{
  background:blue;
  color:#fff;
  text-align:center;
  border-radius:20px;
  width:300px;
  position:absolute;
  bottom:0;
  right:0;
  box-shadow:-10px 0px 50px 1px blue;
  cursor:pointer;
  display:none;
  right:163px;
}
</style>
