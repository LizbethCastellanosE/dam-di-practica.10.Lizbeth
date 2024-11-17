import { ref } from 'vue';

export function useDebug() {
  const debugMode = ref(false); 
  const debugMessages = ref([]); 

  const toggleDebug = () => {
    debugMode.value = !debugMode.value;
    const status = debugMode.value ? 'activado' : 'desactivado';
    const message = `[${new Date().toLocaleTimeString()}] Modo Debug ${status}`;
    debugMessages.value.push(message);
    console.debug(message); 
  };

  const addDebugMessage = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    const formattedMessage = `[${timestamp}] ${message}`;
    
    if (debugMode.value) {
      debugMessages.value.push(formattedMessage); 
      console.debug(formattedMessage); 
    }
  };

  const clearDebugMessages = () => {
    debugMessages.value = [];
    const message = `[${new Date().toLocaleTimeString()}] Mensajes de depuración limpiados`;
    console.debug(message); 
  };

  return {
    debugMode,
    debugMessages,
    toggleDebug,
    addDebugMessage,
    clearDebugMessages,
  };
}
