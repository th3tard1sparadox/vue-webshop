<template>
    <n-form 
        ref="formRef" 
        :model="formValue" 
        :rules="rules"
        label-placement="left"
        :label-width="150"
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
                @input="handlePasswordInput"
                @keydown.enter.prevent
            />
        </n-form-item>
        <n-form-item 
            ref="rPasswordFormItemRef" 
            first 
            path="user.reenteredPassword" 
            label="Enter password again"
        >
            <n-input 
                v-model:value="formValue.user.reenteredPassword"
                type="password"
                placeholder="password"
                :disabled="!formValue.user.password"
                @keydown.enter.prevent
            />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
            <n-button 
                :disabled="formValue.user.email === null || formValue.user.password === null || formValue.user.reenteredPassword === null"
                type="primary"
                @click="handleValidateButtonClick"
            >
                Sign up
            </n-button>
        </div>
    </n-form>
</template>

<script>
import { useMessage } from "naive-ui";
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const formRef = ref(null);
        const rPasswordFormItemRef = ref(null);
        const message = useMessage();
        const formValueRef = ref({
            user: {
                email: null,
                password: null,
                reenteredPassword: null
            }
        });
        function validatePasswordStartWith(rule, value) {
            return !!formValueRef.value.user.password && formValueRef.value.user.password.startsWith(value) && formValueRef.value.user.password.length >= value.length;
        };
        function validatePasswordSame(rule, value) {
            return value === formValueRef.value.user.password;
        };
        const rules = {
            user: {
                email: [
                    {
                        required: true,
                        validator(rule, value) {
                            console.log(value);
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
                ],
                reenteredPassword: [
                    {
                        required: true,
                        message: "Re-entered password is required",
                        trigger: ["input", "blur"]
                    },
                    {
                        validator: validatePasswordStartWith,
                        message: "Password is not same as re-entered password",
                        trigger: "input"
                    },
                    {
                        validator: validatePasswordSame,
                        message: "Password is not same as re-entered password",
                        trigger: ["blur", "input"]
                    }
                ]
            }
        };
        return {
            formRef,
            rPasswordFormItemRef,
            formValue: formValueRef,
            rules,
            handlePasswordInput() {
                if(formValueRef.value.user.reenteredPassword) {
                    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
                }
            },
            handleValidateButtonClick(e) {
                e.preventDefault();
                formRef.value?.validate(async (errors) => {
                    if(!errors) {
                        const gResponse = await fetch("http://localhost:5000/register", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({email: formValueRef.value.user.email, password: formValueRef.value.user.password})
                        });
                        const gObject = await gResponse.json();
                        message.success("Valid");
                    } else {
                        console.log(errors);
                        message.error("Invalid");
                    }
                })
            }
        };
    }
})
</script>