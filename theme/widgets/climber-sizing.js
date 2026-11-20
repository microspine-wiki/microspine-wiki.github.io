/* Calculator for wiki/climbing/sizing-a-limbed-climber.md: loads on the supporting hand and spine counts. */
(() => {
  const FIELDS = [
    {key: 'mass', label: 'Mass, including pads (kg)', value: 30, min: 0.1, step: 0.5},
    {key: 'h', label: 'Centre of mass from the wall, h (m)', value: 0.15, min: 0.01, step: 0.01},
    {key: 'L', label: 'Hands above feet, L (m)', value: 0.9, min: 0.05, step: 0.05},
    {key: 'theta', label: 'Largest holding angle θmax (°)', value: 15, min: 1, max: 60, step: 1},
    {key: 'preload', label: 'Push when placing a hand, P (N)', value: 5, min: 0, step: 0.5},
    {key: 'engaged', label: 'Fraction of spines engaged', value: 0.3, min: 0.05, max: 1, step: 0.05},
    {key: 'strength', label: 'Contact strength F* (N)', value: 1.5, min: 0.1, step: 0.1},
    {key: 'margin', label: 'Margin on spine count (×)', value: 1.5, min: 1, step: 0.1},
  ];

  window.WikiWidgets = window.WikiWidgets || {};
  window.WikiWidgets['climber-sizing'] = root => {
    const el = (name, props = {}, parent) => {
      const node = Object.assign(document.createElement(name), props);
      if (parent) parent.append(node);
      return node;
    };
    el('h4', {textContent: 'Supporting-hand load and spine count'}, root);
    const controls = el('div', {className: 'controls'}, root);
    const readout = el('div', {className: 'readout'}, root);
    const note = el('p', {className: 'note'}, root);
    const inputs = {};
    for (const field of FIELDS) {
      const label = el('label', {textContent: field.label}, controls);
      const input = el('input', {type: 'number', value: field.value, step: field.step}, label);
      if (field.min !== undefined) input.min = field.min;
      if (field.max !== undefined) input.max = field.max;
      input.addEventListener('input', update);
      inputs[field.key] = input;
    }

    function update() {
      const v = Object.fromEntries(FIELDS.map(field => [field.key, Number(inputs[field.key].value)]));
      readout.replaceChildren();
      const usable = FIELDS.every(field => Number.isFinite(v[field.key]) && v[field.key] >= (field.min ?? -Infinity)) && v.theta < 90;
      if (!usable) { note.textContent = 'Enter a positive number in every field.'; note.className = 'note bad'; return; }
      const weight = v.mass * 9.81;
      const theta = v.theta * Math.PI / 180;
      const pull = weight * v.h / v.L;
      const shear = (pull + v.preload) / Math.tan(theta); // shear the supporting hand must carry
      const load = (pull + v.preload) / Math.sin(theta);  // resultant on its spines
      const perSpine = v.engaged * v.strength / 2;         // average load per spine, counting idle ones
      const hand = v.margin * load / perSpine;
      const feasible = shear <= weight;
      const tile = (caption, value, bad) => {
        const box = el('div', {}, readout);
        el('small', {textContent: caption}, box);
        const strong = el('strong', {textContent: value}, box);
        if (bad) strong.className = 'bad';
      };
      tile('Weight W', `${weight.toFixed(0)} N`);
      tile('Pull-in needed at the hands, W h / L', `${pull.toFixed(0)} N`);
      tile('Shear the supporting hand must carry', `${shear.toFixed(0)} N = ${(100 * shear / weight).toFixed(0)} % of W`, !feasible);
      tile('Load on its spines', feasible ? `${load.toFixed(0)} N` : 'not holdable', !feasible);
      tile('Spines per hand', feasible ? String(Math.ceil(hand / 10) * 10) : '–', !feasible);
      tile('Spines per foot (half a hand)', feasible ? String(Math.ceil(hand / 20) * 10) : '–', !feasible);
      note.className = feasible ? 'note' : 'note bad';
      note.textContent = feasible
        ? `Each newton of placing force costs ${(1 / Math.sin(theta)).toFixed(1)} N at the supporting hand. The stance stops being holdable when h / L reaches about ${(Math.tan(theta) - v.preload / weight).toFixed(2)}; here it is ${(v.h / v.L).toFixed(2)}.`
        : `One hand would have to carry more than the whole weight in shear. Bring the centre of mass closer (smaller h), reach higher (larger L), reduce the placing force, or find a larger θmax. The limit is h / L ≈ ${(Math.tan(theta) - v.preload / weight).toFixed(2)}; here it is ${(v.h / v.L).toFixed(2)}.`;
    }
    update();
  };
})();
