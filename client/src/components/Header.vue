<template>
    <div class="header">
       <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions"/> 
    </div>
</template>

<script>
import { h, ref } from "vue";
import { NIcon } from "naive-ui";
import { Home, Activity } from "@vicons/carbon"; 

function renderIcon(icon) {
    return () => h(NIcon, null, {default: () => h(icon) });
}

const menuOptions = [
    {label: () => h("a", {
        href: "http://localhost:3000/",
        }, "Home"),
        key: "home",
        icon: renderIcon(Home)
    },
    {label: () => h("a", {
        href: "http://localhost:3000/ping",
        }, "Ping"),
        key: "ping",
        icon: renderIcon(Activity)
    }
]

export default {
    setup() {
        return {
            activeKey: ref(null),
            menuOptions
        };
    },
}
</script>