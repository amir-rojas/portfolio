/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakSlider,
   TweakColor, TweakRadio, TweakToggle */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ff6b35",
  "accent2": "#ffb800",
  "accent3": "#ff3d68",
  "bgDepth": "absolute",
  "intensity": 1,
  "showGrid": true,
  "iconsOn": true,
  "monoCaps": true
}/*EDITMODE-END*/;

const BG_PRESETS = {
  absolute: { "--bg-0": "#000000", "--bg-1": "#060606", "--bg-2": "#0a0a0a", "--bg-3": "#111111" },
  deep:     { "--bg-0": "#050507", "--bg-1": "#0a0a0d", "--bg-2": "#101014", "--bg-3": "#16161c" },
  charcoal: { "--bg-0": "#0d0d10", "--bg-1": "#131318", "--bg-2": "#181821", "--bg-3": "#1f1f29" }
};

function hexA(hex, a) {
  const m = hex.replace('#', '');
  const r = parseInt(m.slice(0,2), 16);
  const g = parseInt(m.slice(2,4), 16);
  const b = parseInt(m.slice(4,6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to :root CSS variables
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--neon-1', t.accent);
    root.style.setProperty('--neon-2', t.accent2);
    root.style.setProperty('--neon-3', t.accent3);
    root.style.setProperty('--neon-1-soft', hexA(t.accent, 0.16));
    root.style.setProperty('--neon-2-soft', hexA(t.accent2, 0.16));
    root.style.setProperty('--neon-3-soft', hexA(t.accent3, 0.16));
    root.style.setProperty('--intensity', String(t.intensity));

    const preset = BG_PRESETS[t.bgDepth] || BG_PRESETS.absolute;
    Object.entries(preset).forEach(([k, v]) => root.style.setProperty(k, v));

    // grid toggle on hero
    const grid = document.querySelector('.hero-grid');
    if (grid) grid.style.display = t.showGrid ? 'block' : 'none';

    // icons toggle on hero
    const iconWrap = document.querySelector('.hero-icons');
    if (iconWrap) iconWrap.style.display = t.iconsOn ? 'block' : 'none';

    // mono caps style for monospaced uppercase eyebrows
    document.body.style.setProperty('--mono-tt', t.monoCaps ? 'uppercase' : 'none');
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Acentos neón" />
      <TweakColor
        label="Primario"
        value={t.accent}
        options={['#ff6b35', '#ff3d68', '#a78bfa', '#22d3ee', '#84cc16']}
        onChange={(v) => setTweak('accent', v)}
      />
      <TweakColor
        label="Secundario"
        value={t.accent2}
        options={['#ffb800', '#fb7185', '#f472b6', '#60a5fa', '#34d399']}
        onChange={(v) => setTweak('accent2', v)}
      />
      <TweakColor
        label="Terciario"
        value={t.accent3}
        options={['#ff3d68', '#a78bfa', '#facc15', '#06b6d4', '#fb923c']}
        onChange={(v) => setTweak('accent3', v)}
      />

      <TweakSection label="Atmósfera" />
      <TweakRadio
        label="Profundidad del fondo"
        value={t.bgDepth}
        options={['absolute', 'deep', 'charcoal']}
        onChange={(v) => setTweak('bgDepth', v)}
      />
      <TweakSlider
        label="Intensidad scroll-telling"
        value={t.intensity}
        min={0.4}
        max={1.6}
        step={0.1}
        unit="x"
        onChange={(v) => setTweak('intensity', v)}
      />

      <TweakSection label="Hero" />
      <TweakToggle
        label="Iconos 3D flotantes"
        value={t.iconsOn}
        onChange={(v) => setTweak('iconsOn', v)}
      />
      <TweakToggle
        label="Grid de referencia"
        value={t.showGrid}
        onChange={(v) => setTweak('showGrid', v)}
      />
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<App />);
