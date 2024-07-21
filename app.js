// Cargar datos desde LocalStorage
function loadData() {
    const savedData = localStorage.getItem('exercisesData');
    if (savedData) {
        return JSON.parse(savedData);
    }
    return {
        dia1: [
            { id: 1, name: "Flexiones cerradas", reps: "10", sets: "3", weight: "0" },
            { id: 2, name: "Press banco declinado", reps: "12", sets: "3", weight: "10" },
            { id: 3, name: "Press con W", reps: "12", sets: "2", weight: "10" },
            { id: 4, name: "Press pecho en landmine", reps: "12", sets: "3", weight: "20" },
            { id: 5, name: "Dorsales en landmine", reps: "12", sets: "3", weight: "20" },
            { id: 6, name: "Jalon dorsal", reps: "12/10/08", sets: "3", weight: "40" },
            { id: 7, name: "Remo cerrado", reps: "12/10/08", sets: "3", weight: "40" },
            { id: 8, name: "Curl biceps banco scott", reps: "10", sets: "3", weight: "10" },
            { id: 9, name: "Apertura pecho con mancuerna", reps: "12", sets: "3", weight: "10" }
        ],
        dia2: [
            { id: 1, name: "Sentadillas landmine", reps: "12", sets: "3", weight: "20" },
            { id: 2, name: "Sentadilla con mancuerna y estocadas", reps: "12", sets: "3", weight: "10" },
            { id: 3, name: "Peso muerto", reps: "12", sets: "3", weight: "20" },
            { id: 4, name: "Hack", reps: "10/08/06", sets: "3", weight: "15" },
            { id: 5, name: "Gemelos hack", reps: "12", sets: "3", weight: "15" },
            { id: 6, name: "Camilla isquios", reps: "12", sets: "3", weight: "15" },
            { id: 7, name: "Hip trust maquina", reps: "10", sets: "3", weight: "0" },
            { id: 8, name: "Camilla cuadriceps", reps: "10", sets: "3", weight: "50" }
        ],
        dia3: [
            { id: 1, name: "W al menton", reps: "12", sets: "3", weight: "10" },
            { id: 2, name: "Press frances", reps: "12", sets: "3", weight: "0" },
            { id: 3, name: "Vuelos combinados", reps: "12", sets: "3", weight: "10" },
            { id: 4, name: "Pull over", reps: "12", sets: "3", weight: "0" },
            { id: 5, name: "Posteriores maquina", reps: "12", sets: "3", weight: "0" },
            { id: 6, name: "Mariposa", reps: "12", sets: "3", weight: "0" },
            { id: 7, name: "Press plano con barra", reps: "12", sets: "3", weight: "0" },
            { id: 8, name: "Martillo con mancuernas", reps: "12", sets: "3", weight: "0" }
        ]
    };
}

// Guardar datos en LocalStorage
function saveData() {
    localStorage.setItem('exercisesData', JSON.stringify(exercisesData));
}

// Datos iniciales
let exercisesData = loadData();

function loadDay(day) {
    const dayData = exercisesData[day];
    document.getElementById('day-title').innerText = `Ejercicios del ${day}`;
    const exercisesDiv = document.getElementById('exercises');
    exercisesDiv.innerHTML = '';

    dayData.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.innerHTML = `
            <p>${exercise.name} - Reps: ${exercise.reps}, Sets: ${exercise.sets}, Peso: ${exercise.weight} kg
            <button onclick="openEditForm(${exercise.id}, '${day}')">✏️</button></p>
        `;
        exercisesDiv.appendChild(exerciseElement);
    });

    document.getElementById('home').classList.add('hidden');
    document.getElementById('day').classList.remove('hidden');
}

function goHome() {
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('day').classList.add('hidden');
}

function openEditForm(exerciseId, day) {
    const exercise = exercisesData[day].find(ex => ex.id === exerciseId);
    document.getElementById('exercise-id').value = exerciseId;
    document.getElementById('weight').value = exercise.weight;
    document.getElementById('edit-form').classList.remove('hidden');
}

function closeEditForm() {
    document.getElementById('edit-form').classList.add('hidden');
}

document.getElementById('form-edit').addEventListener('submit', function(event) {
    event.preventDefault();
    const exerciseId = parseInt(document.getElementById('exercise-id').value);
    const newWeight = document.getElementById('weight').value;
    const day = Object.keys(exercisesData).find(day => exercisesData[day].some(ex => ex.id === exerciseId));

    const exercise = exercisesData[day].find(ex => ex.id === exerciseId);
    if (exercise) {
        exercise.weight = newWeight;
    }

    saveData(); // Guardar datos después de la modificación
    loadDay(day); // Recargar el día con los datos actualizados
    closeEditForm();
});
