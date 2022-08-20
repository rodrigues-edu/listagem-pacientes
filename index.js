const moment = require("moment")

const pacientes = [
    {id: 1, nome: "Eduardo", dataNascimento: '1982-08-28'},
    {id: 2, nome: "Dayane", dataNascimento: '2005-08-30'},
    {id: 3, nome: "Neuza", dataNascimento: '1967-09-11'}
]

function buscarPaciente (id) {
    return pacientes.find(paciente => paciente.id == id)
}

function calcularIdade (paciente) {
    const hoje = moment()
    const dataNascimento = moment(paciente.dataNascimento, 'YYYY-MM-DD')

    return hoje.diff(dataNascimento, 'years')
}

exports.handler = async (event) => {
    console.log("Paciente Informado: " + event.pacienteId);

    let pacienteEncontrado

    if (event.pacienteId) {
        pacienteEncontrado = buscarPaciente(event.pacienteId)
        pacienteEncontrado.idade = calcularIdade(pacienteEncontrado)

        return {
            statusCode: 200,
            body: JSON.stringify(pacienteEncontrado)
        }
    }
    console.log("DEPLOY CLI")

    const todosPacientes = pacientes.map(p => ({ ...p, idade: calcularIdade(p)}))
    return {
        statusCode: 200,
        body: JSON.stringify(todosPacientes)
    }
}
