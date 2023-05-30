<template>
  <div class="com__box">
    <!-- loading -->
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  name: 'IconL6'
}
</script>

<style lang="scss" scoped>
.com__box {
  width: 14px;
  height: 17px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  display: block;
  position: relative;
  width: 3px;
  height: 10px;

  animation: rectangle infinite 1s ease-in-out -0.2s;

  background-color: #fff;
}

.loading:before,
.loading:after {
  position: absolute;
  width: 3px;
  height: 10px;
  content: "";
  background-color: #fff;
}

.loading:before {
  left: -5px;

  animation: rectangle infinite 1s ease-in-out -0.4s;
}

.loading:after {
  right: -5px;

  animation: rectangle infinite 1s ease-in-out;
}

@keyframes rectangle {
  0%,
  80%,
  100% {
    height: 3px;
    box-shadow: 0 0 #fff;
  }

  40% {
    height: 10px;
    box-shadow: 0 -5px #fff;
  }
}
</style>