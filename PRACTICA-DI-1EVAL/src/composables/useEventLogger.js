import { ref } from 'vue';

export function useEventLogger() {
  const logs = ref([]); 
  const isDebugActive = ref(false); 
  const isConsoleActive = ref(false); 


  const logEvent = (message, origin = 'App') => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] [${origin}] ${message}`;

    if (isDebugActive.value) { 
      logs.value.push(logMessage);
      console.debug(logMessage); 
    }
  };


  const clearLogs = () => {
    logs.value = [];
  };


  const toggleDebug = () => {
    isDebugActive.value = !isDebugActive.value;
    logEvent(`Depuración ${isDebugActive.value ? 'activada' : 'desactivada'}`, 'Debug');
  };


  const toggleConsole = () => {
    isConsoleActive.value = !isConsoleActive.value;
  };

  return {
    logs,
    logEvent,
    clearLogs,
    toggleDebug,
    toggleConsole,
    isDebugActive,
    isConsoleActive,
  };
}
