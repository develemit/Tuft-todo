document.addEventListener("DOMContentLoaded", function(event) {
  console.log("ready!")

  const modalContainer = document.getElementById("modal-container")
  const modalContent = document.getElementById("modal-content")
  const titleText = document.getElementById("title-text")

  const description = document.getElementById("description-text")



  // initiating variables for modal functions
  let currentTodo;
  let currentTitle;
  let currentDescription;
  let currentDay = document.getElementById("due-date-day")
  let currentMonth = document.getElementById("due-date-month")
  let currentYear = document.getElementById("due-date-year")

  const saveBtn = document.getElementById("save")

  const markCompleteBtn = document.getElementById("mark-complete")

  const container = document.getElementById("container")

  const menuBtn = document.getElementById("menu-toggle")

  const nav = document.getElementById("nav")
  const mainContainer = document.getElementById("main-container")
  const navDate = document.getElementsByClassName("nav-date")
  const navDateArray = Array.from(navDate)

  const addTodoBtn = document.getElementById("add-todo")

  const todoList = document.getElementById("todo-list")

  const todoText = document.getElementsByClassName("todo-item")
  //creates an iterable array from todoLine
  const todoItems = Array.from(todoText)
  const firstBadge = document.getElementById("02/16")
  let mainBadge = document.getElementById("main-badge")
  let totalBadge = document.getElementById("total-badge")
    //initiates badges
    firstBadge.innerHTML = todoItems.length
    mainBadge.innerHTML = firstBadge.innerHTML
    totalBadge.innerHTML = +mainBadge.innerHTML + 7
  let totalCompleted = []
  let deletedTodos = []

  navDateArray.map((date, index) => date.addEventListener("click", (e) => {
      navDateArray.map(date => date.classList.remove("nav-date-active"))
      e.target.classList.add("nav-date-active")
    })
  )


  window.onresize = () => {
    if (window.innerWidth <= 1340) {
    console.log("1340 screen width!")
      if(nav.style.width !== "0px")
        nav.style.width = "335px"
        nav.style.zIndex = "3"
        menuBtn.style.gridArea = "1/1/1/1"
        mainContainer.styel.gridArea = "1/1/span all/ span all"
      } else {
        if(nav.style.width === "335px") {
          nav.style.width = "100%"
          menuBtn.style.gridArea = "1 / 3 / 1 / auto"
          mainContainer.style.gridColumn = "3/ span all"
        }
        // menuBtn.style.gridArea = "1/3/1/auto"
        // mainContainer.style.gridArea = "2/1/span all/ span all"

      }
    }

    const openNav = () => {
      if (window.innerWidth >= 1340) {
        nav.style.width = "100%"
        nav.style.mindWidth = "335px"
        mainContainer.style.gridColumn = "3/span all"
        menuBtn.style.gridColumn = "3"
      }else{
        console.log("hello!")
        nav.style.width = "335px"
        nav.style.zIndex = "3"
        }
      }

    const closeNav = () => {
      if (window.innerWidth >= 1340) {
        nav.style.width = "0px"
        mainContainer.style.gridColumn = "1/span all"
        document.body.style.backgroundColor = "white"
        menuBtn.style.gridColumn = "1"
      }else{
        console.log("hello!")
        nav.style.width = "0px"
        mainContainer.style.gridColumn = "1/span all"
      }
    }

    //Opens/Closes SideNav
    menuBtn.addEventListener("click", () => {
      nav.style.width === "0px" ?
      openNav() :
      closeNav()
    })

  const checkBoxClick = () =>
  todoItems.map(item => {
      let checkBox = item.previousElementSibling
    if (checkBox.classList.contains("hasClick")){
       return item
    }  else {
      checkBox.classList.add("hasClick")
      checkBox.addEventListener("click", () => {
      item.classList.contains("complete-todo") ?
      item.classList.remove("complete-todo") :
      item.classList.add("complete-todo")
        console.log("hello!")

      if (item.classList.contains("complete-todo")){
        checkBox.classList.remove('fa-square-o')
        checkBox.classList.add('fa')
        checkBox.classList.add('fa-check-square-o')
      } else {
      checkBox.classList.add('fa-square-o')
      checkBox.classList.remove('fa')
      checkBox.classList.remove('fa-check-square-o')
      }
        totalCompleted = todoItems.filter(item => item.classList.contains("complete-todo"))

        //updates badges
        firstBadge.innerHTML = todoItems.length - totalCompleted.length - deletedTodos.length
        mainBadge.innerHTML = firstBadge.innerHTML
        totalBadge.innerHTML = +mainBadge.innerHTML + 7
      })
      return item
    }
  })

  checkBoxClick()

  const showEditModal = () => todoItems.map(item =>{
     item.addEventListener("click", (e) =>{
      modalContainer.style.display = ""
      modalContent.style.display = ""
      container.style.backgroundColor = "rgba(0, 0, 0, .2)"
      mainBadge.style.backgroundColor = "#0F70AA"
      mainBadge.style.color = "#C7CACB"


      // console.log("event in question - ", e.target)
      description.value = item.nextElementSibling.value
      titleText.value = e.target.innerHTML
      currentDay.value = item.parentNode.children[3].value
      currentMonth.value = item.parentNode.children[4].value
      currentYear.value = item.parentNode.children[5].value

      if (description.value === "undefined"){
        description.value = ""
      }
      // console.log("Clicked todo and title text - ", titleText)

      currentTodo = document.getElementById(e.target.innerHTML)
      console.log('current todo - ', currentTodo)
      console.log('Previous child node - ',currentTodo.previousElementSibling)
      // currentTodo.previousElementSibling.addEventListener("click", )

      currentTodo.classList.contains('complete-todo') ?
        markCompleteBtn.innerHTML = "Not Completed" :
        markCompleteBtn.innerHTML = "Mark As Complete"


    })
  })

  showEditModal()

  let closeModal = (target) => target.addEventListener("click", () => {
    modalContainer.style.display = "none"
    modalContent.style.display = "none"
    container.style.backgroundColor = "rgba(255, 255, 255, 1)"
    mainBadge.style.backgroundColor = "#128DD5"
    mainBadge.style.color = "white"
  })

  //close modal event added to dom elements
  closeModal(modalContainer)
  closeModal(saveBtn)
  closeModal(markCompleteBtn)

  const save = () => saveBtn.addEventListener("click", (e) => {
     let newTitle = document.getElementById("title-text")

    console.log('current title - ',newTitle.value)

    currentTodo.id = newTitle.value
    currentTodo.nextElementSibling.value = description.value
    currentTodo.parentNode.children[3].value = currentDay.value
    currentTodo.parentNode.children[4].value = currentMonth.value
    currentTodo.parentNode.children[5].value = currentYear.value

    currentTodo.innerHTML = newTitle.value
  })
save()

  const markComplete = (target) => target.addEventListener("click", (e) => {

    currentTodo.classList.contains("complete-todo") ?
    currentTodo.classList.remove("complete-todo") :
    currentTodo.classList.add("complete-todo")

    console.log('todo classlist - ',currentTodo.classList)
    if (currentTodo.classList.contains("complete-todo")){
    currentTodo.previousElementSibling.classList.remove('fa-square-o')
    currentTodo.previousElementSibling.classList.add('fa')
    currentTodo.previousElementSibling.classList.add('fa-check-square-o')
    totalCompleted.push(currentTodo)
  } else {
    currentTodo.previousElementSibling.classList.add('fa-square-o')
    currentTodo.previousElementSibling.classList.remove('fa')
    currentTodo.previousElementSibling.classList.remove('fa-check-square-o')
    totalCompleted.pop()
  }
    //updates badges
    firstBadge.innerHTML = todoItems.length - totalCompleted.length - deletedTodos.length
    mainBadge.innerHTML = firstBadge.innerHTML
    totalBadge.innerHTML = +mainBadge.innerHTML + 7
  })
  markComplete(markCompleteBtn)


  const getTrashCans = document.getElementsByClassName("fa-trash-o")

  //creates an iterable array from getTrashCans
  const trash = Array.from(getTrashCans)

  //gets the current number of todos
  let todoCount = () => {
    let itemCount = []

    todoList.childNodes.forEach(li => {
      if (li.nodeName === "LI")
        itemCount.push(li)
    })
    return itemCount.length
  }



  //shows modal


  //removes todo Item
  const removeTodo = (target) => target.addEventListener("click", (e) => {
      let currentItem = e.target.parentNode

      if(confirm("Are you sure you want to delete this todo?")) {
        todoList.removeChild(currentItem)
          if(currentItem.children[1].classList.contains("complete-todo")){
            null
        } else {
          deletedTodos.push(currentItem.children[1])
          firstBadge.innerHTML = todoItems.length - totalCompleted.length - deletedTodos.length
          mainBadge.innerHTML = firstBadge.innerHTML
          totalBadge.innerHTML = +mainBadge.innerHTML + 7
        }
      } else {
        null
      }
    })

  trash.map(can => removeTodo(can))

  //adds a new todo with appropriate count
  addTodoBtn.addEventListener("click", () => {
    let newLine = document.createElement('li')
    let newItem = document.createElement('span')
    let trashcan = document.createElement('i')
    let checkBox = document.createElement('i')
    let newDescription = document.createElement('input')
    let newDay = document.createElement('input')
    let newMonth = document.createElement('input')
    let newYear = document.createElement('input')


    //creates a new li in the todoList ul
    todoList.appendChild(newLine)

    //adds class to the newly created li
    newLine.classList.add("todo-line")
    //adds checkbox to li
    newLine.appendChild(checkBox)
    checkBox.classList.add("fa-square-o")
    //adds a span to the li
    newLine.appendChild(newItem)
    //adds class to the newly created span
    newItem.classList.add("todo-item")
    //adds starter text for span based on todo-list length
    newItem.innerHTML = `Item ${todoCount() - 1}`
    //adds dynamic id to newItem without the beginning space
    newItem.id = newItem.innerHTML

    newLine.appendChild(newDescription)
    newDescription.type = "hidden"
    newDescription.value = ""

    newLine.appendChild(newDay)
    newDay.type = "hidden"
    newDay.value = ""

    newLine.appendChild(newMonth)
    newMonth.type = "hidden"
    newMonth.value = ""

    newLine.appendChild(newYear)
    newYear.type = "hidden"
    newYear.value = "2017"


    //adds a trashcan to the end of the new todo
    newLine.appendChild(trashcan)
    //adds classes to the trashcans to
    trashcan.classList.add("fa")
    trashcan.classList.add("fa-trash-o")
    trash.push(trashcan)

    todoItems.push(newItem)
    //adds click event to create edit modal

    newItem.addEventListener("click", (e) => {
      modalContainer.style.display = ""
      modalContent.style.display = ""
      container.style.backgroundColor = "rgba(0, 0, 0, .2)"

      titleText.value = e.target.innerHTML

    })

    showEditModal()
    checkBoxClick()
    removeTodo(trashcan)
    console.log('new item', newItem)
    console.log("todoItems length = ", todoItems.length)
    //updates badges
    firstBadge.innerHTML = todoItems.length - totalCompleted.length - deletedTodos.length
    mainBadge.innerHTML = firstBadge.innerHTML
    totalBadge.innerHTML = +mainBadge.innerHTML + 7
  })

})
