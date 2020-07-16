module.exports = function (data) {
  if (data.situacao === 'aprovado') {
    return `<td><span class="badge badge-pill badge-success"> Aprovado por ${data.validadoPor}</span></td>`;
  } else if (data.situacao === 'rejeitado') {
    return `<td><span class="badge badge-pill badge-danger"> Rejeitado por ${data.validadoPor}</span></td>`;
  } else {
    return `<td><form style="display:inline" method="post" action="/horarios/${data.id}/aprovar">
      <button class="btn btn-sm btn-outline-secondary" type="submit">Aprovar</button>
      </form>
      <form style="display:inline" method="post", action="/horarios/${data.id}/rejeitar">
      <button class="btn btn-sm btn-outline-danger" type="submit">Rejeitar</button>
      </form></td>`;
  } 
};