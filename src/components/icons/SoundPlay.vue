<template>
  <div :class="'wifi-symbol ' + classStyle">
    <div class="wifi-circle first"></div>
    <div class="wifi-circle second"></div>
    <div class="wifi-circle third"></div>
  </div>
</template>

<script>
export default {
  name: 'SoundPlay',
  props: {
    classStyle: {
      //类型不匹配会警告
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.wifi-symbol {
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  overflow: hidden;
  transform: rotate(-45deg);
  float: right;
  margin-right: 10px;
}
.wifi-circle {
  border: 3px solid #000;
  border-radius: 60%;
  position: absolute;
}
.first {
  width: 5px;
  height: 5px;
  background: #cccccc;
  top: 25px;
  left: 25px;
}

.second {
  width: 15px;
  height: 15px;
  top: 20px;
  left: 20px;
}

.third {
  width: 25px;
  height: 25px;
  top: 15px;
  left: 15px;
}

.play .second {
  animation: fadeInOut 1s infinite 0.2s;

}
.play .third {
  animation: fadeInOut 1s infinite 0.4s;
}

@keyframes fadeInOut {
  0% {
      opacity: 0; /*初始状态 透明度为0*/
  }
  100% {
      opacity: 1; /*结尾状态 透明度为1*/
  }
}
</style>