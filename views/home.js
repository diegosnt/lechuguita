const getHomePage = (projectName, apiUrl) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${projectName} - Cotizaciones del dólar en Argentina">
  <meta name="theme-color" content="#3d9970">

  <!-- PWA -->
  <link rel="manifest" href="/manifest.json">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">

  <title>${projectName}</title>

  <!-- Water.css - Classless CSS framework -->
  <link rel="stylesheet" href="/css/water.css">

  <style>
    /* Paleta de colores verdes */
    :root {
      --verde-oscuro: #1b4332;
      --verde-bosque: #2d6a4f;
      --verde-medio: #40916c;
      --verde-claro: #52b788;
      --verde-pastel: #74c69d;
      --verde-menta: #95d5b2;
      --verde-suave: #b7e4c7;
      --verde-muy-claro: #d8f3dc;
    }

    body {
      max-width: 900px;
      margin: 0 auto;
      padding: 0.5rem;
      background: linear-gradient(135deg, var(--verde-muy-claro) 0%, #ffffff 100%);
    }

    header {
      text-align: center;
      margin-bottom: 0.5rem;
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, var(--verde-medio) 0%, var(--verde-bosque) 100%);
      border-radius: 4px;
      color: white;
      box-shadow: 0 1px 3px rgba(27, 67, 50, 0.1);
    }

    header h1 {
      color: white;
      margin: 0;
      font-size: 1.2rem;
      text-transform: capitalize;
    }

    header p {
      display: none;
    }

    .cotizaciones-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.5rem;
      margin: 0;
    }

    .cotizacion-card {
      border: 1px solid var(--verde-pastel);
      border-radius: 6px;
      padding: 0.75rem;
      background: white;
      box-shadow: 0 1px 3px rgba(45, 106, 79, 0.1);
    }

    .cotizacion-card h3 {
      margin-top: 0;
      font-size: 0.9rem;
      text-align: center;
      color: var(--verde-oscuro);
      background: var(--verde-muy-claro);
      padding: 0.4rem;
      border-radius: 4px;
    }

    .valores {
      display: flex;
      gap: 0.5rem;
      justify-content: space-around;
      margin: 0.75rem 0;
    }

    .valor {
      text-align: center;
      flex: 1;
      padding: 0.5rem;
      border-radius: 4px;
      background: var(--verde-suave);
    }

    .valor:first-child {
      background: linear-gradient(135deg, var(--verde-menta) 0%, var(--verde-suave) 100%);
    }

    .valor:last-child {
      background: linear-gradient(135deg, var(--verde-pastel) 0%, var(--verde-menta) 100%);
    }

    .valor-label {
      font-size: 0.7rem;
      color: var(--verde-oscuro);
      font-weight: 600;
      display: block;
      margin-bottom: 0.2rem;
    }

    .valor-precio {
      font-size: 1rem;
      font-weight: bold;
      color: var(--verde-bosque);
    }

    .fecha {
      font-size: 0.65rem;
      text-align: center;
      color: var(--verde-medio);
      margin-top: 0.75rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--verde-pastel);
    }

    .loading, .error {
      text-align: center;
      padding: 2rem;
      border-radius: 8px;
    }

    .loading {
      background: var(--verde-muy-claro);
      color: var(--verde-oscuro);
    }

    .error {
      background: #ffebee;
      color: #c62828;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      padding: 0.5rem 0.75rem;
      background: white;
      border-radius: 4px;
      border: 1px solid var(--verde-menta);
    }

    .controls small {
      color: var(--verde-medio);
      font-size: 0.75rem;
    }

    .controls code {
      background: var(--verde-muy-claro);
      color: var(--verde-oscuro);
      padding: 0.15rem 0.4rem;
      border-radius: 3px;
      font-size: 0.7rem;
    }

    button {
      background: linear-gradient(135deg, var(--verde-medio) 0%, var(--verde-bosque) 100%) !important;
      color: white !important;
      border: none !important;
      padding: 0.4rem 0.8rem !important;
      border-radius: 4px !important;
      font-weight: 600 !important;
      font-size: 0.85rem !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      box-shadow: 0 1px 3px rgba(45, 106, 79, 0.2) !important;
    }

    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(45, 106, 79, 0.3) !important;
    }

    button:active:not(:disabled) {
      transform: translateY(0);
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  </style>
</head>
<body>
  <header>
    <h1>${projectName}</h1>
    <p>Cotizaciones del dólar en Argentina</p>
  </header>

  <main>
    <div class="controls">

      <button id="btn-actualizar">Actualizar</button>
    </div>

    <div id="cotizaciones-container">
      <p class="loading">Cargando cotizaciones...</p>
    </div>
  </main>

  <script src="/js/app.js"></script>
</body>
</html>
  `;
};

module.exports = { getHomePage };
