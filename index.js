const listaLogin = buscarDadosDoLocalStorage('Lista-Usuarios')

// LOGAR USUARIO
const formHTML = document.getElementById('form-login')

formHTML.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    if (!email || !senha || !email.includes('@')) {
        formHTML.classList.add('was-validated')
        return;
    }

    //aqui 
    const senhaEmailInvalidos = document.getElementById('senha-email-invalidos')

    const existe = listaLogin.find((valor) => valor.email === email && valor.senha === senha)
    console.log(existe)

    if (!existe) {
        senhaEmailInvalidos.innerHTML = `E-mail ou senha inválidos!`

        setTimeout(() => {
            senhaEmailInvalidos.innerHTML = ''
        }, 3000)
    } else {
        window.location.href = "./pagina-recados.html"
    }
    console.log(listaLogin);

    guardarNoLocalStorage('usuarioLogado', existe)
})


// CADASTRAR USUARIO

const formularioHTML = document.getElementById('form-criar-conta')

const listaCadastros = buscarDadosDoLocalStorage('Lista-Usuarios')
console.log(listaCadastros)

const feedbackHTML = window.document.getElementById('feedback')

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const email = document.getElementById('email-usuario').value;

    const senha = document.getElementById('senha-usuario').value;

    const repetirSenha = document.getElementById('repetir-senha-usuario').value;

    const feedbackHTML = document.getElementById('feedback')


    const verificaEmail = listaCadastros.some((valor) => valor.email === email)

    if (verificaEmail) {
        feedbackHTML.innerText = ("Email ja cadastrado. Tente novamente!")

        setTimeout(() => {
            feedbackHTML.innerText = ''
        }, 1000)

        return;
    }


    if (senha !== repetirSenha) {
        feedbackHTML.innerText = ("As senhas não conferem. Tente novamente!")

        setTimeout(() => {
            feedbackHTML.innerText = ''
        }, 3000)

        return;
    }

    const novoCadastro = {
        email,
        senha,
        repetirSenha,
        recados: []
    }

    listaCadastros.push(novoCadastro)

    guardarNoLocalStorage('Lista-Usuarios', listaCadastros)
    formularioHTML.reset()

    console.log(listaCadastros);

    if (novoCadastro) {
        feedbackHTML.innerText = ("Conta criada!")

        setTimeout(() => {
            feedbackHTML.innerText = ''
            window.location.href = './index.html'
        }, 2000)
        return;
    }
})


function guardarNoLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor)

    localStorage.setItem(chave, valorJSON)
}

function buscarDadosDoLocalStorage(chave) {
    const dadoJSON = localStorage.getItem(chave)

    if (dadoJSON) {
        const listaDados = JSON.parse(dadoJSON)
        return listaDados
    } else {
        return []
    }
}
