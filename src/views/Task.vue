<template>
    <div>
        <p>{{ title }} #{{ getId() }}</p>
        <h1>{{ task.title }}</h1>
        <p v-if="task.status == 'active'">Задача активна</p>
        <p v-if="task.status == 'oldest'">Задача просрочена</p>
        <p v-if="task.status == 'Завершено'">Задача Завершена</p>
        <v-layout
                text-center
                wrap
                center
                class="jcc"
        >
            <v-form
                ref="form"
                @submit.prevent="updatedTask"
                v-model="valid"
                :lazy-validation="lazy"
        >
            <v-textarea
                    v-model="description"
                    :counter="2048"
                    :rules="descriptionRules"
                    label="Enter the description of the task"
                    required
            ></v-textarea>

            <!-- Chips -->
            <div class="chips" refs="chips">
                <v-chip
                        v-for="(chip, idx) in getChips.tags"
                        class="ma-2"
                        :key="idx"
                >
                    {{ chip }}
                </v-chip>
            </div>
            <!-- End Chips -->
            <!-- DatePicker -->
            <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    full-width
                    width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                            v-model="task.deadline"
                            label="Укажите дедлайн данной задачи!"
                            readonly
                            v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="task.deadline" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                </v-date-picker>
            </v-dialog>
            <!-- End DatePicker -->

            <v-btn
                    color="warning"
                    type="submit"
                    v-if="task.status != 'Завершено'"
            >
                Редактировать
            </v-btn>

            <v-btn
                    color="error"
                    class="ml-4"
                    @click="recoverTask"
                    v-if="task.status == 'Завершено'"
            >
                Возобновить
            </v-btn>
            <v-btn
                    color="error"
                    class="ml-4"
                    @click="completed"
                    v-else
            >
                Завершить задачу
            </v-btn>
        </v-form>
        </v-layout>
        <v-snackbar
                v-model="snackbar"
        >
            Упс, что-то упустили! :)
            <v-btn
                    color="red"
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>
<script>
    export default {
        data: () => ({
            title: "Task",
            taskId: null,
            date: new Date().toISOString().substr(0, 10),
            modal: false,
            snackbar: false,
            chips: [],
            tagName: "",
            items: [],
            valid: false,
            name: '',
            description: '',
            descriptionRules: [
                v => !!v || 'Description task is required',
                v => (v && v.length <= 2048) || 'Name must be less than 2048 characters',
            ],
            lazy: false,
        }),
        methods: {
            reset () {
                this.$refs.form.reset()
            },
            updatedTask() {
                if(this.valid) {
                    this.$store.dispatch('updatedTask', {
                        id: this.task.id,
                        description: this.description,
                        deadline: this.task.deadline
                    })
                    this.$router.push('/list')
                } else {
                    this.snackbar = true
                    return false
                }
            },
            recoverTask() {
                console.log('Возобновлена!')
                this.$store.dispatch('recoverTask', this.task.id)
            },
            getId() {
                return this.$route.params.id
            },
            completed() {
                console.log('Завершена!')
                this.$store.dispatch('completedTask', this.task.id)
                this.$router.push('/list')
            }
        },
        computed: {
            task() {
                return this.$store.getters.getTask(Number(this.getId()))
            },
            getChips() {
                return this.$store.getters.getChips(Number(this.getId()))
            }
        },
        mounted() {
            this.description = this.task.description
        }

    }
</script>