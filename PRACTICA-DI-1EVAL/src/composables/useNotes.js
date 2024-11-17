import { ref } from 'vue';

export function useNotes(logEvent) {

  const notes = ref([
    { id: 1, title: 'Nota 1', description: 'Descripción de la nota 1', selected: false, isEditing: false },
    { id: 2, title: 'Nota 2', description: 'Descripción de la nota 2', selected: false, isEditing: false },
    { id: 3, title: 'Nota 3', description: 'Descripción de la nota 3', selected: false, isEditing: false },
  ]);

  const createNote = () => {

    const nextId = notes.value.length
      ? Math.max(...notes.value.map(note => note.id)) + 1
      : 1;
  

      notes.value.push({
      id: nextId,
      title: `Nota ${nextId}`,
      description: `Descripción de la Nota ${nextId}`,
      selected: false,  
      isEditing: false,  
      editTitle: '',
      editDescription: '',
    });
  

    if (logEvent) logEvent(`Nota creada con ID: ${nextId}`);
  };


  const deleteNote = (id) => {
    notes.value = notes.value.filter(note => note.id !== id);
    if (logEvent) logEvent(`Nota eliminada con ID: ${id}`);
  };


  const duplicateNote = (id) => {
    const noteToDuplicate = notes.value.find(note => note.id === id);
    if (noteToDuplicate) {
      const maxId = notes.value.reduce((max, note) => Math.max(max, note.id), 0);
      notes.value.push({
        ...noteToDuplicate,
        id: maxId + 1,
        title: `${noteToDuplicate.title} (copia)`,
        selected: false,
        isEditing: false,
      });

      if (logEvent) logEvent(`Nota duplicada con ID: ${noteToDuplicate.id}`);
    }
  };


  const clearNotes = () => {
    notes.value = [];
    if (logEvent) logEvent('Todas las notas han sido limpiadas.');
  };

  return {
    notes,
    createNote,
    deleteNote,
    duplicateNote,
    clearNotes,
  };
}
