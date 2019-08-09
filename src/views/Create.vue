<template>
  <div>
    <h1>{{ title }}</h1>
    <v-spacer></v-spacer>

    <v-layout
            text-center
            wrap
            center
            class="jcc"
    >
    <v-form
            ref="form"
            @submit.prevent="createTask"
            v-model="valid"
            :lazy-validation="lazy"
            :class="{'error-form': errorsubmit == true}"
    >
      <v-text-field
              v-model="name"
              :counter="100"
              :rules="nameRules"
              label="Enter the title of the task"
              required
      ></v-text-field>
      <v-textarea
              v-model="description"
              :counter="2048"
              :rules="descriptionRules"
              label="Enter the description of the task"
              required
      ></v-textarea>

      <!-- Chips -->
      <div class="chips" refs="chips">
        <v-layout wrap align-center justify-space-between>
          <v-flex md10 xs10>
            <v-text-field
                    v-model="tagName"
                    label="Enter the tag of the task"

            ></v-text-field>
          </v-flex>
          <v-flex md2 xs2>
            <v-btn
                    @click="addTag()"
                    class="bxs-n"
            >
              <v-icon dark center>add</v-icon>
            </v-btn>

          </v-flex>
        </v-layout>

        <v-chip
                v-for="(chip, idx) in chips"
                class="ma-2"
                close
                @click:close="remove(idx)"
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
                  v-model="date"
                  label="Укажите дедлайн данной задачи!"
                  readonly
                  v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <!-- End DatePicker -->
      <v-btn
              color="error"
              class="mr-4"
              @click="reset"
      >
        Очистить форму
      </v-btn>

      <v-btn
              color="warning"
              type="submit"
      >
        Создать задачу
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
      title: "Create Task",
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      snackbar: false,
      errorsubmit: false,
      chips: [],
      tagName: "",
      items: [],
      valid: false,
      name: '',
      description: '',
      nameRules: [
        v => !!v || 'Title task is required',
        v => (v && v.length <= 100) || 'Name must be less than 100 characters',
      ],
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
      remove (item) {
        console.log(item)
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      },
      addTag() {
        if(this.tagName) {
          this.chips.push(this.tagName)
          this.tagName = ''
        } else {
          return false
        }
      },
      createTask() {
        if(this.valid) {
          const task = {
            id: Date.now(),
            status: 'active',
            title: this.name,
            description: this.description,
            deadline: this.date,
            tags: this.chips
          }
          this.$store.dispatch('createTask', task)
          this.$router.push('/list')
        } else {
          this.snackbar = true
          this.errorsubmit = true
          return false
        }
      }
    },
    created() {
      if(this.$store.state.length) {
        console.log(this.$store.state)
      }
    }
  }
</script>
<style>
  .layout{
    margin: 0 auto;
  }
  .jcc {
    justify-content: center;
  }
  .error-form {
    padding: 10px;
    border: 4px solid red;
    border-radius: 20px;
  }
  .success-form {
    padding: 10px;
    border: 4px solid green;
    border-radius: 20px;
  }
  .bxs-n {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
</style>


