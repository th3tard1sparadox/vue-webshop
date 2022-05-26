<template>
    <n-form 
        ref="formRef" 
        :model="formValue" 
        :rules="rules"
        label-placement="left"
        :label-width="100"
        :style="{
            maxWidth: '30rem',
            padding: '1rem'
        }"
    >
        <n-form-item path="user.email" label="Email">
            <n-input 
                v-model:value="formValue.user.email" 
                placeholder="email" 
                @keydown.enter.prevent
            />
        </n-form-item>
        <n-form-item path="user.password" label="Password">
            <n-input 
                v-model:value="formValue.user.password"
                type="password"
                placeholder="password"
                @keydown.enter.prevent
            />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
            <n-button 
                :disabled="formValue.user.email === null"
                type="primary"
                @click="handleValidateButtonClick"
            >
                Log in
            </n-button>
        </div>
    </n-form>
</template>

<script>
import { useMessage } from "naive-ui";
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        window.$message = useMessage();
    },
    data: function() {
        return {
            formRef: ref(null),
            formValue: ref({
                user: {
                    email: null,
                    password: null
                }
            }),
            rules: {
                user: {
                    email: [
                        {
                            required: true,
                            validator(rule, value) {
                                if(!value) {
                                    return new Error("Email is required");
                                } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                                    return new Error("Not a valid email")
                                }
                                return true;
                            },
                            trigger: ["input", "blur"]
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: "Password is required"
                        }
                    ]
                }
            },

        }
    },
    methods: {
        handleValidateButtonClick: function(e) {
            e.preventDefault();
            this.$refs.formRef.validate(async (errors) => {
                if(!errors) {
                    const gResponse = await fetch("http://localhost:5000/login", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({email: this.formValue.user.email, password: this.formValue.user.password}),
                        credentials: 'include',
                        mode: 'cors'
                    });
                    if(gResponse.ok) {
                        const gObject = await gResponse.json();
                        this.$store.commit('setUserId', gObject['id']);
                        this.$store.commit('setEmail', this.formValue.user.email);
                        this.$router.push('/');
                    } else {
                        window.$message.error("Login unsuccessful");
                    }
                } else {
                    console.log(errors);
                    window.$message.error("Login unsuccessful");
                }
            })
        }
    }
})
</script>