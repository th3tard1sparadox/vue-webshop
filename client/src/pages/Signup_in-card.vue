<template>
    <div style="display: flex; flex: 1 0 auto; padding: 2rem; flex-direction: column; justify-content: flex-start; align-items: center;">
        <n-card style="min-width: 30rem;">
            <n-tabs
                class="card-tabs"
                default-value="signin"
                size="large"
                type="card"
            >
                <n-tab-pane name="signin" tab="Sign in">
                    <Login />
                </n-tab-pane>
                <n-tab-pane name="signup" tab="Sign up">
                    <Signup />
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </div>
</template>

<script>
import Login from "../components/Signin.vue"
import Signup from "../components/Signup.vue"

export default {
    name: "SignupCard",
    components: { Login, Signup }
}
</script>

<style>
.n-card__content {
    padding-left: 0;    
    padding-right: 0;    
}
.n-tab-pane {
    display: flex;
    justify-content: center;
}
.card-tabs .n-tabs-nav--bar-type {
    padding-left: 4px;
}
</style>