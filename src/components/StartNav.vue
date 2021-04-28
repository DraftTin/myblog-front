<template>
  <nav>
    <div class="navbar-left-container">
      <router-link :to="{name: 'Home'}">
        <div class="navbar-item">
          <font-awesome-icon :icon="['fas', 'blog']"></font-awesome-icon>
          <!-- <img src="@/assets/blogger-brands.svg" alt="myblog"> -->
            <!-- <img src="@/assets/logo.png" class="" alt="logo"/> -->
            <h4 class="logo">MY BLOOG</h4>
        </div>
      </router-link>
      <div class="navbar-item">
        <Search/>
      </div>
      <div class="navbar-item"><router-link class="nav-link" :to="{ name: 'Home' }">首页</router-link></div>
    </div>
    <div class="navbar-right-container">
        <div class="navbar-item">
            <a class="nav-link" href="#explore" @click.prevent="anchorJump">
                <!-- Explore -->
                探索
            </a>
        </div>
        <div class="navbar-item">
            <a class="nav-link" href="#features" @click.prevent="anchorJump">
                <!-- Feature -->
                特性
            </a>
        </div>     
        <div class="navbar-item">
            <a class="nav-link" href="#about-us" @click.prevent="anchorJump">
                <!-- About Us -->
                关于
            </a>
        </div>
        <div class="navbar-item">
            <router-link class="nav-link" :to="{ name: 'LoginInterface'}">
                <!-- Login -->
                登陆
            </router-link>
        </div>
    </div>
  </nav>
  <!-- <nav>
    <div class="logo-container">
        <img src="@/assets/logo.png" class="" alt="logo"/>
        <h4 class="logo">MY PAGE</h4>
    </div>
    <div>
        <ul class="nav-links">
            <li><a class="nav-link" href="#explore" @click.prevent="anchorJump">Explore</a></li>
            <li><a class="nav-link" href="#features" @click.prevent="anchorJump">Features</a></li>
            <li><a class="nav-link" href="#about-us" @click.prevent="anchorJump">About Us</a></li>
            <li><router-link class="nav-link" :to="{ name: 'LoginInterface'}">Login</router-link></li>
        </ul>
    </div>
  </nav> -->
</template>

<script>

import Search from '@/components/Search.vue'

export default {
  name: 'StartNav',
  components: {Search},
  methods: {
      anchorJump(e) {
          document.getElementById(e.target.hash.substring(1)).scrollIntoView()
      }
  }
}
</script>

<style scoped>

nav{
    height: 10vh;
    left: 0;
    top: 0;
    margin: auto;
    display: flex;
    align-items: center;
    background-color: #181818;
}

.navbar-left-container {
  display: flex;
  flex: 1;
  align-items: center;
}

.navbar-left-container .navbar-item {
  margin-left: 2.5rem;
}

.navbar-right-container {
  display: flex;
  justify-content: flex-end;
  flex: 1;
  margin-right: 5%;
  align-items: center;
}

.navbar-right-container .navbar-item {
  margin-right: 2.5rem;;
}

.navbar-item {
  display: flex;
  align-items: center;
  text-decoration: none;
}

/* .navbar-item img {
  height: 1.5rem;
  margin-right: 0.5rem;
} */

.nav-link {
  color: #b1afaf;
  font-size: 1.2rem;
}

h4 {
    color: #b1afaf;
}

.nav-link:hover {
    background-color: var(--midnight)
}

.nav-link {
  font-size: 1.3rem;
}

h4.logo {
  margin-left: 0.5rem;
}

</style>

<style scoped>

svg {
  color: #b1afaf;
}

</style>