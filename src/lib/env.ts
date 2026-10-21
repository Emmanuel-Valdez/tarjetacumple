// Astro expone .env via import.meta.env; el codigo de servidor usa process.env.
// Este modulo copia el .env local a process.env (sin pisar variables ya definidas).
try {
  process.loadEnvFile();
} catch {
  // Sin .env (produccion: las variables vienen del contenedor).
}
