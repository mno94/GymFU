fetch('routine.json')
    .then(response => response.json())
    .then(data => {
        window.days = {
            dia1: data.day1,
            dia2: data.day2,
            dia3: data.day3
        };
    })
    .catch(error => console.error('Error loading routine:', error));

function loadDay(day) {
    if (!window.days) {
        console.error('Days data not loaded yet.');
        return;
    }
    document.getElementById('home').classList.add('hidden');
    document.getElementById('day').classList.remove('hidden');
    document.getElementById('day-title').innerText = day.charAt(0).toUpperCase() + day.slice(1);

    const exercises = window.days[day];
    const exercisesContainer = document.getElementById('exercises');
    exercisesContainer.innerHTML = '';

    exercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.innerHTML = `
            <h3>${exercise.name}</h3>
            <p>Reps: ${exercise.reps}</p>
            <p>Sets: ${exercise.sets}</p>
            <p>Weight: ${exercise.weight}</p>
            <button onclick="markAsDone(this)">Mark as done</button>
        `;
        exercisesContainer.appendChild(exerciseElement);
    });
}

function goHome() {
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('day').classList.add('hidden');
}

function markAsDone(button) {
    button.innerText = 'Done';
    button.disabled = true;
}
