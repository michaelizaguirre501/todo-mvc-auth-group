
const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not') // these 3 define variablesfrom our ejs based on classes 
const todoComplete = document.querySelectorAll('span.completed')
//Event listeners
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})
// Adding a smurf to all elements in our todoItem array.
Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})
// Adding smurf to all elements in todoComplete array.
Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})
//Handles deleting todos
async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
//Handles marking todos complete
async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
//Handles marking todos incomplete
async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}