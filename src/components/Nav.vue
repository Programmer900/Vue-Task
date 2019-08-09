<template>
    <div>
    <v-toolbar dense>
        <v-toolbar-title class="headline text-uppercase">{{ description }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn v-for="(btn, ix) in BUTTONS"
                    link
                    active-class="active"
                    class="ml-4"
                    :key="ix"
                    :to="btn.path"
            >
                {{btn.title}}
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
    </div>
</template>
<script>
    const BUTTONS = [
        { title: 'Create', icon: 'home', path: '/' },
        { title: 'List', icon: 'home', path: '/list' }
    ];
    export default {
        name: "Navigation",
        props: ["title", "description"],
        data: () => ({
            BUTTONS
        })
    }
</script>