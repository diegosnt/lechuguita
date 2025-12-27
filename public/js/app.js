// JavaScript para la aplicación
console.log('✓ Aplicación cargada correctamente!');

// ==========================================
// UTILIDADES
// ==========================================

// Utilidad: Fetch con timeout
async function fetchWithTimeout(url, options = {}, timeout = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('La petición tardó demasiado tiempo');
    }
    throw error;
  }
}

// Utilidad: Debounce para evitar múltiples clicks
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Formatear número como moneda argentina
function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor);
}

// Crear tarjeta de cotización
function crearTarjetaCotizacion(cotizacion) {
  const fecha = new Date(cotizacion.fechaActualizacion);
  const fechaFormateada = fecha.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <div class="cotizacion-card">
      <h3>${cotizacion.nombre}</h3>
      <div class="valores">
        <div class="valor">
          <span class="valor-label">Compra</span>
          <span class="valor-precio">${formatearMoneda(cotizacion.compra)}</span>
        </div>
        <div class="valor">
          <span class="valor-label">Venta</span>
          <span class="valor-precio">${formatearMoneda(cotizacion.venta)}</span>
        </div>
      </div>
      <div class="fecha">
        <small>Actualizado: ${fechaFormateada}</small>
      </div>
    </div>
  `;
}

// Obtener y mostrar cotizaciones
async function obtenerCotizaciones() {
  const container = document.getElementById('cotizaciones-container');
  const btnActualizar = document.getElementById('btn-actualizar');

  if (!container || !btnActualizar) {
    console.error('Elementos del DOM no encontrados');
    return;
  }

  // Mostrar estado de carga
  container.innerHTML = '<p class="loading">Cargando cotizaciones...</p>';
  btnActualizar.disabled = true;

  try {
    const result = await fetchWithTimeout('/api/cotizaciones', {}, 10000);

    if (result.success && Array.isArray(result.data)) {
      // Crear contenedor con grid
      container.innerHTML = '<div class="cotizaciones-grid"></div>';
      const grid = container.querySelector('.cotizaciones-grid');

      // Crear tarjetas para cada cotización
      result.data.forEach(cotizacion => {
        grid.innerHTML += crearTarjetaCotizacion(cotizacion);
      });

      console.log('✓ Cotizaciones cargadas:', result.data.length);
    } else {
      throw new Error('Respuesta inválida del servidor');
    }
  } catch (error) {
    console.error('✗ Error al obtener cotizaciones:', error.message);
    container.innerHTML =
      error.message === 'La petición tardó demasiado tiempo'
        ? '<p class="error">⏱️ Timeout: La API tardó demasiado. Intenta de nuevo.</p>'
        : '<p class="error">❌ Error al conectar con la API. Intenta de nuevo.</p>';
  } finally {
    btnActualizar.disabled = false;
  }
}

// Debounced version para evitar spam de clicks
const obtenerCotizacionesDebounced = debounce(obtenerCotizaciones, 500);

// Verificar conectividad
async function checkHealth() {
  try {
    const data = await fetchWithTimeout('/api/health', {}, 3000);
    console.log('✓ Health check:', data.status);
    return data.status === 'ok';
  } catch (error) {
    console.error('✗ Health check failed:', error.message);
    return false;
  }
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', async () => {
  console.log('📱 Inicializando aplicación...');

  // Verificar health
  const isHealthy = await checkHealth();
  if (isHealthy) {
    console.log('✓ Servidor funcionando correctamente');
  }

  // Obtener cotizaciones automáticamente
  await obtenerCotizaciones();

  // Agregar evento al botón de actualizar con debounce
  const btnActualizar = document.getElementById('btn-actualizar');
  if (btnActualizar) {
    btnActualizar.addEventListener('click', obtenerCotizacionesDebounced);
  } else {
    console.error('✗ Botón de actualizar no encontrado');
  }

  console.log('✓ Aplicación inicializada');

  // Registrar Service Worker para PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw/service-worker.js')
      .then(function(reg) {
        console.log('✓ Service Worker registrado');
      })
      .catch(function(err) {
        console.log('✗ Error al registrar Service Worker:', err);
      });
  }
});

// Manejo de errores no capturados
window.addEventListener('error', (event) => {
  console.error('✗ Error global capturado:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('✗ Promise rechazada no manejada:', event.reason);
});
