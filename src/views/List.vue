<template>
    <div>
        <h1>List Tasks</h1>
        <v-spacer></v-spacer>
        <v-layout
                text-center
                wrap
                center
                class="jcc mx-w-500">
            <v-select
                    :items="f"
                    label="Профильтруй... )"
                    v-model="filter"
            ></v-select>
        </v-layout>
        <v-layout>
            <v-simple-table
                    dark
                    v-if="tasks.length"
                    class="fw"
            >
                <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Title</th>
                    <th class="text-left">Description</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Deadline</th>
                </tr>
                </thead>
                <tbody>
                <router-link :class="{
                'completed': task.status == 'Завершено',
                'deactivated': task.status == 'oldest',
                'activated': task.status == 'active'
                }" tag="tr" :to="'/task/' + task.id" v-for="(task, idx) in showFilterTasks" :key="task.id">
                        <td class="text-left">{{ idx + 1 }}</td>
                        <td class="text-left">{{ task.title }}</td>
                        <td class="text-left restriction-block"><span class="size-trim">{{ task.description }}</span></td>
                        <td class="text-left">{{ task.status }}</td>
                        <td class="text-left">{{ task.deadline }}</td>
                </router-link>
                </tbody>
            </v-simple-table>

            <div class="text-center fw" v-else>
                <v-sheet color="red lighten-3 s-20">You have no tasks!</v-sheet>
            </div>
        </v-layout>
    </div>
</template>
<script>
    export default {
        data: () => ({
            f: [
                {
                    text: "Активные",
                    value: "active"
                },
                {
                    text: "Просроченные",
                    value: "oldest"
                },
                {
                    text: "Завершенные",
                    value: "Завершено"
                },
            ],
            filter: null
        }),
        computed: {
            tasks() {
                return this.$store.getters.getTasks
            },
            showFilterTasks() {
                return this.tasks.filter(t => {
                    if(!this.filter) {
                        return true
                    }
                    return t.status === this.filter
                })
            }
        }
    }
</script>
<style scoped>
    .fw {
        width: 100%;
    }
    .mx-w-500 {
        max-width: 500px;
    }
    .restriction-block {
        max-width: 350px;
    }
    .size-trim {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
    }
    .completed {
        background-color: red;
    }
    .deactivated {
        background-color: orange;
    }
    .activated {
        background-color: green;
    }
</style>