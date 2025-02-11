function addTask() {
    const input = document.getElementById("todo-input");
    const task = input.value.trim();
    if (task !== "") {
        const li = document.createElement("li");
        li.textContent = task;
        li.addEventListener("click", () => li.classList.toggle("completed"));
        document.getElementById("todo-list").appendChild(li);
        input.value = "";
    }
}
