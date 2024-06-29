const ENDPOINT = "http://localhost:3000/planetas";

//----------------------> XHR

// OBTENER TODOS
export function obtenerTodos() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });

    xhr.open("GET", `${ENDPOINT}`);
    xhr.send();
  });
}

//CREAR UNO
export function crearUno(objeto) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });

    xhr.open("POST", `${ENDPOINT}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(objeto));
  });
}

//EDITAR UNO
export function editarUno(objeto) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });
    xhr.open("PUT", `${ENDPOINT}/${objeto.id}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(objeto));
  });
}

//BORRAR UNO
export function borrarUno(objeto) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = xhr.statusText;
          resolve(data);
        } else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });
    xhr.open("DELETE", `${ENDPOINT}/${objeto.id}`);
    xhr.send(JSON.stringify(objeto));
  });
}

//OBTENER UNO
export function obtenerUno(id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });
    xhr.open("GET", `${ENDPOINT}/${id}`);
    xhr.send();
  });
}

//BORRAR TODOS
export function borrarTodos() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = xhr.statusText;
          resolve(data);
        } else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });
    xhr.open("DELETE", `${ENDPOINT}`);
    xhr.send();
  });
}

//----------------------> FETCH

// OBTENER TODOS
export async function obtenerTodosFetch() {
  const options = {
    method: "GET",
    headers: { "content-type": "application/json" },
  };

  let data = await fetch(`${ENDPOINT}`, options);
  data = await data.json();

  return data;
}

//CREAR UNO
export async function crearUnoFetch(objeto) {
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(objeto),
  };

  let data = await fetch(`${ENDPOINT}`, options);
  data = await data.json();

  return data;
}

//EDITAR UNO
export async function editarUnoFetch(objeto) {
  const options = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(objeto),
  };

  let data = await fetch(`${ENDPOINT}/${objeto.id}`, options);
  data = await data.json();

  return data;
}

//BORRAR UNO
export async function borrarUnoFetch(objeto) {
  const options = {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  };

  let data = await fetch(`${ENDPOINT}/${objeto.id}`, options);

  return data;
}

//OBTENER UNO
export async function obtenerUnoFetch(id) {
  const options = {
    method: "GET",
    headers: { "content-type": "application/json" },
  };

  let data = await fetch(`${ENDPOINT}/${id}`, options);
  data = await data.json();

  return data;
}
