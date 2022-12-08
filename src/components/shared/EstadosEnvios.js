export function EstadosEnvios (state) {
    var desc = "";
    switch (state) {
        case 'I':
          console.log('Ingresado');
          desc = "Ingresado"
          return desc;
        case 'C':
          console.log('Calendarizado');
          desc = "Calendarizado"
          return desc;
        case 'CR':
          console.log('Camino Recolectar');
          desc = "Camino Recolectar"
          return desc;
        case 'R':
          console.log('Recolectado');
          desc = "Recolectado"
          return desc;
        case 'B':
            console.log('Bodega');
            desc = "Bodega"
            return desc;
        case 'CE':
          console.log('Camino a Entregar');
          desc = "Camino a Entregar"
          return desc;
        case 'E':
          console.log('Entregado');
          desc = "Entregado"
          return desc;
        case 'ER':
        console.log('En Reserva');
        desc = "En Reserva'"
        return desc;
        case 'D':
          console.log('Depositado');
          desc = "Depositado"
          return desc;
        case 'X':
          console.log('Cancelado');
          desc = "Cancelado"
          return desc;
        default:
          console.log('Error');
          desc = "Error"
          return desc;
      }

}
