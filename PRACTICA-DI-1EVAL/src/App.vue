<template>
  <div id="app">
    <header>
      <img src="@/assets/logo.svg" alt="Vue Logo" class="logo" height="40" width="40" />
      <h1>PRACTICA-DI: 1EVAL</h1>
    </header>
    <div class="main-container">
      <Toolbar :notes="notes" @action="performAction"/>
      <div class="notes-list">
        <Nota
          v-for="note in notes"
          :key="note.id"
          :note="note"
          @deleteNote="deleteNote"
          @cloneNote="duplicateNote"
          @selectNote="toggleSelectNote"
          @editNote="updateNote"
        />
      </div>
    </div>
    <DebugConsole v-if="showConsole" :logs="debugMessages" />
  </div>
</template>

<script setup>
import Toolbar from './components/Toolbar.vue';
import Nota from './components/Nota.vue';
import DebugConsole from './components/DebugConsole.vue';
import { useNotes } from './composables/useNotes'; 
import { useEventLogger } from './composables/useEventLogger'; 
import { useDebug } from './composables/useDebug'; 


const { logEvent } = useEventLogger(); 
const { debugMode, debugMessages, toggleDebug, addDebugMessage, clearDebugMessages } = useDebug();
const { notes, createNote, deleteNote, duplicateNote, clearNotes } = useNotes(logEvent);

import { ref, onMounted, watch } from 'vue'; 

const showConsole = ref(false);

// Eventos al montar el componente
onMounted(() => {
  logEvent("Componente App montado");
  if (debugMode.value) addDebugMessage("Componente App montado");
});


const monitorNotes = () => {
  const previousNotes = [...notes.value];


  setInterval(() => {
    const newNotes = [...notes.value];
    const changes = detectChanges(previousNotes, newNotes);

    if (changes.length > 0) {
      const message = `Notas actualizadas: ${changes.join(', ')}`;
      logMessage(message); 
    }

    previousNotes.splice(0, previousNotes.length, ...newNotes); 
  }, 1000); 
};


const detectChanges = (oldNotes, newNotes) => {
  const changes = [];
  newNotes.forEach((note, index) => {
    if (!oldNotes[index]) {
      changes.push(`Nueva nota ID: ${note.id}`);
    } else if (oldNotes[index].title !== note.title || oldNotes[index].description !== note.description) {
      changes.push(`Nota ID ${note.id} modificada`);
    }
  });

  if (oldNotes.length > newNotes.length) {
    changes.push(`Notas eliminadas: ${oldNotes.length - newNotes.length}`);
  }

  return changes;
};


const performAction = (action) => {
  logMessage(`Acción ejecutada: ${action}`);

  switch (action) {
    case 'new':
      createNote();
      logMessage('Nota creada');
      break;
    case 'clone':
      notes.value.filter(note => note.selected).forEach(note => {
        duplicateNote(note.id);
        logMessage(`Nota con ID ${note.id} clonada`);
      });
      break;
    case 'delete':
      notes.value.filter(note => note.selected).forEach(note => {
        deleteNote(note.id);
        logMessage(`Nota con ID ${note.id} eliminada`);
      });
      break;
    case 'clear':
      clearNotes();
      logMessage('Todas las notas eliminadas');
      break;
    case 'select':
      notes.value.forEach(note => (note.selected = true));
      logMessage('Todas las notas seleccionadas');
      break;
    case 'invert':
      notes.value.forEach(note => (note.selected = !note.selected));
      logMessage('Selección de notas invertida');
      break;
    case 'deselect':
      notes.value.forEach(note => (note.selected = false));
      logMessage('Todas las notas deseleccionadas');
      break;
    case 'debug':
      toggleDebug();
      logMessage(`Modo Debug ${debugMode.value ? 'activado' : 'desactivado'}`);
      break;
    case 'console':
      showConsole.value = !showConsole.value;
      logMessage(`Consola ${showConsole.value ? 'mostrada' : 'ocultada'}`);
      break;
    case 'clearDebug':
      clearDebugMessages();
      logMessage('Mensajes de depuración limpiados');
      break;
    case 'reload':
      resetNotes();
      logMessage('Notas iniciales recargadas');
      break;
    default:
      logMessage(`Acción desconocida: ${action}`);
  }
};


const logMessage = (message) => {
  console.log(message); // Muestrapor la consola del navegador
  logEvent(message); // Registrar en la consola de la app
  if (debugMode.value) {
    addDebugMessage(`[DEBUG] ${message}`);
  }
};


monitorNotes();



const resetNotes = () => {
  notes.value = [
    { id: 1, title: 'Nota 1', description: 'Descripción de la nota 1', selected: false },
    { id: 2, title: 'Nota 2', description: 'Descripción de la nota 2', selected: false },
    { id: 3, title: 'Nota 3', description: 'Descripción de la nota 3', selected: false }
  ];
  logEvent("Notas iniciales recargadas");
  if (debugMode.value) addDebugMessage("Notas iniciales recargadas");
};

const updateNote = (updatedNote) => {
  const index = notes.value.findIndex(note => note.id === updatedNote.id);
  if (index !== -1) {
    notes.value[index] = updatedNote;
    logEvent(`Nota actualizada con ID: ${updatedNote.id}`);
    if (debugMode.value) addDebugMessage(`Nota actualizada con ID: ${updatedNote.id}`);
  }
};

const toggleSelectNote = (noteId) => {
  const note = notes.value.find(note => note.id === noteId);
  if (note) {
    note.selected = !note.selected;
    logEvent(`Nota ${note.selected ? 'seleccionada' : 'deseleccionada'} con ID: ${note.id}`);
    if (debugMode.value) {
      addDebugMessage(`Nota ${note.selected ? 'seleccionada' : 'deseleccionada'} con ID: ${note.id}`);
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: #033954; 
  padding: 20px;
}


header {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #081c35, #028bfc);
  border-radius: 10px 28px;
  color: white;
  padding: 10px;
  text-align: left;
}

.logo {
  margin-right: 10px;
  transition: transform 0.3s ease;
}

.main-container {
  display: flex; 
  flex-direction: row; 
  justify-content: flex-start; 
  align-items: flex-start; 
  gap: 20px; 
}


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
  margin-top: 15px
}

.toolbar button {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  gap: 5px; 
  color: #ffffff;
  border: none;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px; 
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.toolbar button img {
  height: 18px; 
  width: 18px;
}

.toolbar button:hover {
  background-color: #109f88; 
  transform: scale(1.05); 
}


.notes-list {
  display: flex; 
  flex-wrap: wrap; 
  gap: 20px; 
  justify-content: flex-start; 
  margin-top: 5px;
}

.note {
  color: rgb(29, 18, 84);
  font-size: 16px; 
  border: 2px dashed #d4d7f5;
  margin: 10px;
  padding: 15px; 
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 220px; 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.note.selected {
  background: linear-gradient(135deg, #275e99, #000789); 
  color: white; 
  box-shadow: 0 0 20px #647998;

}

.note:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(72, 98, 191, 0.3);
}

</style>
