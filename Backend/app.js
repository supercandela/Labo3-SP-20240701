const cors = require('cors'); // Importa el paquete cors
const express = require('express');
const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

let planetas = [
    {
        "id": 1,
        "nombre": "Mercurio",
        "tamano": 4879,
        "masa": 3.3011e23,
        "tipo": "rocoso",
        "distancia_al_sol": 57.9e6,
        "posee_anillo": false,
        "presencia_de_vida": false,
        "composicion_atmosferica": "O2, Na, H2, He, K"
    },
    {
        "id": 2,
        "nombre": "Venus",
        "tamano": 12104,
        "masa": 4.8675e24,
        "tipo": "rocoso",
        "distancia_al_sol": 108.2e6,
        "posee_anillo": false,
        "presencia_de_vida": false,
        "composicion_atmosferica": "CO2, N2, SO2, Ar"
    },
    {
        "id": 3,
        "nombre": "Tierra",
        "tamano": 12742,
        "masa": 5.972e24,
        "tipo": "rocoso",
        "distancia_al_sol": 149.6e6,
        "posee_anillo": false,
        "presencia_de_vida": true,
        "composicion_atmosferica": "N2, O2, Ar, CO2"
    },
    {
        "id": 4,
        "nombre": "Marte",
        "tamano": 6779,
        "masa": 6.4171e23,
        "tipo": "rocoso",
        "distancia_al_sol": 227.9e6,
        "posee_anillo": false,
        "presencia_de_vida": false,
        "composicion_atmosferica": "CO2, Ar, N2, O2"
    },
    {
        "id": 5,
        "nombre": "Júpiter",
        "tamano": 139820,
        "masa": 1.8982e27,
        "tipo": "gaseoso",
        "distancia_al_sol": 778.5e6,
        "posee_anillo": false,
        "presencia_de_vida": false,
        "composicion_atmosferica": "H2, He, CH4, NH3"
    },
    {
        "id": 6,
        "nombre": "Saturno",
        "tamano": 116460,
        "masa": 5.6834e26,
        "tipo": "gaseoso",
        "distancia_al_sol": 1434e6,
        "posee_anillo": true,
        "presencia_de_vida": false,
        "composicion_atmosferica": "H2, He, CH4, NH3"
    },
    {
        "id": 7,
        "nombre": "Urano",
        "tamano": 50724,
        "masa": 8.6810e25,
        "tipo": "gaseoso",
        "distancia_al_sol": 2871e6,
        "posee_anillo": false,
        "presencia_de_vida": false,
        "composicion_atmosferica": "H2, He, CH4"
    },
    {
        "id": 8,
        "nombre": "Neptuno",
        "tamano": 49244,
        "masa": 1.02413e26,
        "tipo": "gaseoso",
        "distancia_al_sol": 4495e6,
        "posee_anillo": false,
        "presencia_de_vida": false,
        "composicion_atmosferica": "H2, He, CH4"
    },
    {
        "id": 9,
        "nombre": "Plutón",
        "tamano": 2376,
        "masa": 1.303e22,
        "tipo": "enano",
        "distancia_al_sol": 5906.4e6,
        "posee_anillo": false,
        "presencia_de_vida": false,
        "composicion_atmosferica": "N2, CH4, CO"
    }
];

// Middleware para simular una demora de 3 segundos
const simulateDelay = (req, res, next) => {
    setTimeout(next, 3000);
};

/**
 * Obtiene todas las planetas
 */
app.get('/planetas', simulateDelay, (req, res) => {
    res.json(planetas);
});

/**
 * Crea una nueva Planeta
 */
app.post('/planetas', simulateDelay, (req, res) => {
    const nuevoPlaneta = req.body;
    nuevoPlaneta.id = planetas.length + 1;
    planetas.push(nuevoPlaneta);
    res.status(200).json(nuevoPlaneta);
});

/**
 * Obtiene Planeta por ID
 */
app.get('/planetas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const planeta = planetas.find(p => p.id === id);
    if (planeta) {
        res.json(planeta);
    } else {
        res.status(404).send('Planeta no encontrado');
    }
});

/**
 * Edita Planeta por ID
 */
app.put('/planetas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = planetas.findIndex(p => p.id === id);
    if (index !== -1) {
        const newObj = req.body;
        newObj.id = id;
        planetas[index] = newObj;
        
        res.json(newObj);
    } else {
        res.status(404).send('Planeta no encontrado');
    }
});

/**
 * Elimina Planeta por ID
 */
app.delete('/planetas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = planetas.findIndex(p => p.id === id);
    if (index !== -1) {
        planetas.splice(index, 1);
        res.status(200).send();
    } else {
        res.status(404).send('Planeta no encontrado');
    }
});

/**
 * Elimina todas las planetas
 */
app.delete('/planetas', simulateDelay, (req, res) => {
    planetas = [];
    res.status(200).send('Todas las planetas han sido eliminadas');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});