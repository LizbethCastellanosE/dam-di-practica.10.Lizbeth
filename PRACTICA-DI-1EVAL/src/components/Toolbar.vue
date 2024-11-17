<template>
  <div class="toolbar">
    <button @click="performAction('new')">
      <img src="../assets/img/nota.png" alt="Nueva" height="10" width="10" />
      Nueva
    </button>
    <button @click="performAction('clone')">
      <img src="../assets/img/clonar.png" alt="Clonar" height="10" width="10" />
      Clonar
    </button>
    <button @click="performAction('delete')">
      <img src="../assets/img/borrar.png" alt="Borrar" height="10" width="10" />
      Borrar
    </button>
    <button @click="performAction('clear')">
      <img src="../assets/img/limpi.png" alt="Limpiar" height="10" width="10" />
      Limpiar
    </button>
    <button @click="performAction('select')">
      <img src="../assets/img/seleccione.png" alt="Seleccionar" height="10" width="10" />
      Seleccionar
    </button>
    <button @click="performAction('invert')">
      <img src="../assets/img/reload.png" alt="Invertir" height="10" width="10" />
      Invertir
    </button>
    <button @click="performAction('deselect')">
      <img src="../assets/img/anular.png" alt="Anular" height="10" width="10" />
      Anular
    </button>
    <button @click="performAction('debug')">
      <img src="../assets/img/debug.png" alt="Debug" height="10" width="10" />
      Debug
    </button>
    <button @click="performAction('clearDebug')">
      <img src="../assets/img/limpiar.png" alt="Limpiar Debug" height="10" width="10" />
      Limpiar Debug
    </button>
    <button @click="performAction('console')">
    <img src="../assets/img/consola.png" alt="Consola" height="10" width="10" />
    Consola
    </button>
    <button @click="performAction('reload')">
      <img src="../assets/img/reload.png" alt="Recargar" height="10" width="10" />
      Reload
    </button>
  </div>
  </template>
        
  <script setup>
  const emit = defineEmits(['action']);
  
  const performAction = (action) => {
    emit('action', action);
  };
  </script>
  
  <style scoped>

.toolbar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-content: center;
  width: 100%;
  max-width: 450px;
  background-color: #7bcfdb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(149, 0, 0, 0.1);
  margin-top: 15px;
}


.toolbar button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to right, #13608a 0%, #4a69be 51%, #006aa2 90%);
  padding: 8px 12px;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  transition: background-color 0.3s, transform 0.3s ease-in-out;
  gap: 5px;
}

.toolbar button img {
  height: 16px;
  width: 18px;
}

.toolbar button:hover {
  background-color: #109f88;
  transform: scale(1.05);
}
</style>
