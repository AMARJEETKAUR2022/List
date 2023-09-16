document.addEventListener("DOMContentLoaded", function () {
    const cardList = document.querySelector('.card-list');
    const addCardButton = document.getElementById('addCard');

    addCardButton.addEventListener('click', function () {
        createCard();
    });

    function createCard() {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const card = document.createElement('div');
        card.classList.add('card');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        const cardTitle = document.createElement('h2');
        cardTitle.textContent = 'To-Do List';

        cardHeader.appendChild(cardTitle);

        // Create a "Delete" button inside each card
        const deleteCardButton = document.createElement('button');
        deleteCardButton.innerText = 'Delete Card';
        deleteCardButton.className = 'delete-card';
        deleteCardButton.addEventListener('click', function () {
            cardContainer.removeChild(card);
            // Resize the card container when a card is deleted
            resizeCardContainer(cardContainer);
        });
        cardHeader.appendChild(deleteCardButton);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');

        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.placeholder = 'Add a new task';

        const addTaskButton = document.createElement('button');
        addTaskButton.innerText = 'Add';
        addTaskButton.className = 'addTask';

        const taskList = document.createElement('ul');

        inputContainer.appendChild(taskInput);
        inputContainer.appendChild(addTaskButton);

        cardBody.appendChild(inputContainer);
        cardBody.appendChild(taskList);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        cardContainer.appendChild(card);

        cardList.appendChild(cardContainer);

        addTaskButton.addEventListener('click', function () {
            const taskText = taskInput.value.trim();

            if (taskText !== '') {
                const li = document.createElement('li');

                const taskTextElement = document.createElement('span');
                taskTextElement.textContent = taskText;

                const deleteTaskButton = document.createElement('button');
                deleteTaskButton.innerText = 'Delete Task';
                deleteTaskButton.className = 'delete-task';

                deleteTaskButton.addEventListener('click', function () {
                    taskList.removeChild(li);
                    // Resize the card container when a task is deleted
                    resizeCardContainer(cardContainer);
                });

                li.appendChild(taskTextElement);
                li.appendChild(deleteTaskButton);

                taskList.appendChild(li);

                taskInput.value = '';

                // Resize the card container after adding a task
                resizeCardContainer(cardContainer);
            }
        });

        taskInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                addTaskButton.click();
            }
        });
    }

    function resizeCardContainer(cardContainer) {
        // Find the maximum height among all cards within the container
        const cardHeights = Array.from(cardContainer.getElementsByClassName('card')).map(card => card.offsetHeight);
        const maxCardHeight = Math.max(...cardHeights);

        // Calculate the new height of the card container based on the maximum card height
        const newHeight = maxCardHeight + 20; // Adjust the padding as needed

        // Set the card container's height
        cardContainer.style.height = `${newHeight}px`;
    }
});
