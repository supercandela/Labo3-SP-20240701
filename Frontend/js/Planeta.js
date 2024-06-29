import PlanetaBase from "./PlanetaBase.js";

export default class Planeta extends PlanetaBase {
    constructor(id, nombre, tamano, masa, tipo, distancia_al_sol, presencia_de_vida, posee_anillo, composicion_atmosferica) {
        super(id, nombre, tamano, masa, tipo);
        this.distancia_al_sol = distancia_al_sol;
        this.presencia_de_vida = presencia_de_vida;
        this.posee_anillo = posee_anillo;
        this.composicion_atmosferica = composicion_atmosferica
    }
}