
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  // Limpa os resultados anteriores
  result.innerHTML = '';

  // Obtém os dados informados pelo usuário
  const gender = getSelectedValue('gender');
  const age = getInputNumberValue('age');
  const weight = getInputNumberValue('weight');
  const height = getInputNumberValue('height');
  const activityLevel = Number(getSelectedValue('activity_level'));

  // Validação dos campos numéricos
  if (
    !Number.isInteger(age) ||
    age < 18 ||
    age > 100
  ) {
    alert('Informe uma idade válida entre 18 e 100 anos.');
    return;
  }

  if (
    !Number.isFinite(weight) ||
    weight < 1 ||
    weight > 500 ||
    Math.round(weight * 10) !== weight * 10
  ) {
    alert('Informe um peso válido entre 1 e 500 kg, com até uma casa decimal.');
    return;
  }

  if (
    !Number.isInteger(height) ||
    height < 50 ||
    height > 250
  ) {
    alert('Informe uma altura válida entre 50 e 250 cm.');
    return;
  }

  // Validação das opções selecionadas
  if (!['male', 'female'].includes(gender)) {
    alert('Selecione uma opção válida para sexo.');
    return;
  }

  const validActivityLevels = [1.2, 1.375, 1.55, 1.725, 1.9];

  if (!validActivityLevels.includes(activityLevel)) {
    alert('Selecione um nível de atividade física válido.');
    return;
  }

  // Cálculo da Taxa Metabólica Basal (TMB)
  const tmb = Math.round(
    gender === 'female'
      ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))
      : (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
  );

  // Cálculo das estimativas calóricas
  const maintenance = Math.round(tmb * activityLevel);
  const loseWeight = maintenance - 450;
  const gainWeight = maintenance + 450;

  // Exibição dos resultados
  const layout = `
    <h2>Aqui está o resultado:</h2>

    <div class="result-content">
      <ul>
        <li>
          Seu metabolismo basal é de
          <strong>${tmb} calorias</strong>.
        </li>
        <li>
          Para manter o seu peso você precisa consumir em média
          <strong>${maintenance} calorias</strong>.
        </li>
        <li>
          Para perder peso você precisa consumir em média
          <strong>${loseWeight} calorias</strong>.
        </li>
        <li>
          Para ganhar peso você precisa consumir em média
          <strong>${gainWeight} calorias</strong>.
        </li>
      </ul>
    </div>
  `;

  result.innerHTML = layout;
}

function getSelectedValue(id) {
  const select = document.getElementById(id);
  return select.value;
}

function getInputNumberValue(id) {
  const input = document.getElementById(id);
  const value = input.value.trim();

  if (value === '') {
    return NaN;
  }

  return Number(value);
}
