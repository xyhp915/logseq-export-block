import '@logseq/libs';
import { registerExportCommands } from './commands/export-commands';

/**
 * Main plugin initialization function
 */
function main(): void {
  try {
    // Register all export commands
    registerExportCommands();
  } catch (error) {
    console.error('Plugin initialization failed:', error);
  }
}

// Initialize the plugin when Logseq is ready
logseq.ready(main).catch(error => {
  console.error('Plugin initialization failed:', error);
});