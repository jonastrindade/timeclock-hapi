function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

module.exports = (fim, inicio) => {
  return `<td>${addZero(inicio.getHours())}:${addZero(inicio.getMinutes())}</time></td>
  <td>${addZero(fim.getHours())}:${addZero(fim.getMinutes())}</td>
  <td>${(Math.abs(
    new Date(fim) - new Date(inicio)
  ) / 3600000).toFixed(2)} horas</td>`;
};