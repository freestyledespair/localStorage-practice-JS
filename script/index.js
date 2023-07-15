const output = document.getElementById('output')
const form = document.querySelector('form')
const add = document.getElementById('btn')
// const div1 = document.createElement('')

form.addEventListener('submit', (e) => {
    e.preventDefault()
})


const plan = []

const addToDo = () => {
    const input = document.getElementById('inp')

    const ToDo = {
        id: plan.length + 1,
        name: input.value,
        compleated: false,
    }

    plan.push(ToDo)
    input.value = ''
    renderToDos()
    addLocalStorage()
}



const renderToDos = () => {
    output.innerHTML = ''
    plan.map(el => {
        const cards = document.createElement('div')
        const title = document.createElement('h2')
        const done = document.createElement('button')
        const edit = document.createElement("button")
        const del = document.createElement("button")
        edit.textContent = "edit"
        del.textContent = "delete"
        done.addEventListener('click', () => {
            el.compleated = !el.compleated
            console.log(el.compleated);
            addLocalStorage(renderToDos())
        })
        if (el.compleated == true) {
            cards.classList.add('green')
            done.textContent = 'Done'
        } else {
            cards.classList.add('grey')
            done.textContent = 'is not done'
        }

        edit.addEventListener("click", () => {
            const userAnswer = confirm("Желаете заменить слово?")
            if (userAnswer == true) {
                const newTodo = prompt("New Task")
                el.name = newTodo
            }
            addLocalStorage(renderToDos())
        })

        // del.addEventListener("click", () => {
        //     const delTask = confirm("Можно ли удалить")
        //     if (delTask == true) {
        //         const Trash = plan.filter(function (f) {

        //         })
        //     }
        // })

        title.innerHTML = el.name
        cards.append(title, done, edit, del)
        output.append(cards)
    })


}


add.addEventListener('click', addToDo)





const addLocalStorage = () => {
    localStorage.setItem('list', JSON.stringify(plan))
}

const addFromLocalStorage = () => {
    const data = localStorage.getItem('list')
    console.log(data);
    if (data != null) {
        plan = JSON.parse(data)
        renderToDos()
    }
}