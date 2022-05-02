<template>
    <div class="header">
       <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions"/> 
    </div>
</template>

<script>
import { h, ref } from "vue";
import { NIcon } from "naive-ui";
import { Home, Star, UserAvatar, Favorite } from "@vicons/carbon"; 

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
        href: "http://localhost:3000/stickers",
        }, "Stickers"),
        key: "stickers",
        icon: renderIcon(Star)
    },
    {label: () => h("a", {
        href: "http://localhost:3000/user",
        }, "Profile"),
        key: "profile",
        icon: renderIcon(UserAvatar)
    },
    {label: () => h("a", {
        href: "http://localhost:3000/wishlist",
        }, "Wishlist"),
        key: "wishlist",
        icon: renderIcon(Favorite)
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