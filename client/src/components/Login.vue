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
                @input="handlePasswordInput"
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
        const formRef = ref(null);
        const message = useMessage();
        const formValueRef = ref({
            user: {
                email: null,
                password: null
            }
        });
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
                ]
            }
        };
        return {
            formRef,
            formValue: formValueRef,
            rules,
            handleValidateButtonClick(e) {
                e.preventDefault();
                formRef.value?.validate((errors) => {
                    if(!errors) {
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