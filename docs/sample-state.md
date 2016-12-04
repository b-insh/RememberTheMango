```js
{
  currentUser: {
    id: 1,
    username: "mango_lover"
  },
  forms: {
    signUp: {errors: []},
    logIn: {errors: []},
    createList: {errors: ["Please enter a name for your list."]}
  },
  tasks: {
    1: {
      title: "Do your laundry",
      start: 4 Dec 2016,
      estimate: "5 minutes",
      due: 5 Dec 2016,
      // location: "Bushwick",
      author_id: 1,
      list_id: 1
      // tags: {
      //   1: {
      //     id: 1
      //     name: "chores"
      //   }
      // }
    }
  },
  lists: {
    1: {
      title: "Getting my life together",
      author_id: 1,
    }
  }
  notes: {
    body: "Remember to bring CASH",
    task_id: 1
  }
}
