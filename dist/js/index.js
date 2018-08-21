var gama = [];

gama.initialize = function () {
    // Initialize firebase
    gama.setupFirebase();
    gama.formSetup();
}

gama.setupFirebase = function () {
    // Firebase setup
    try {
        var app = firebase.app();
        var features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
        console.log(`Firebase SDK carregado com sucesso!  Recursos: ${features.join(', ')}`);
    } catch (e) {
        console.error(e);
    }
}

gama.formSetup = function() {
    $.validator.addMethod("regx", function(value, element, regexpr) {
		return regexpr.test(value);
    }, "Verifique o valor digitado.");
       
    var options = {
        rules: {
            email: {
                required: true,
                regx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            },
            nome: {
                required: true,
                regx: /^[a-zA-ZáÁéÉ][a-zA-ZáÁéÉ]+([ ][a-zA-ZáÁéÉ]+)*([ ][a-zA-ZáÁéÉ][a-zA-ZáÁéÉ]+)+([ ][a-zA-ZáÁéÉ]+)*$/,
                minlength: 3
            },
            assunto: {
                required: true,
                minlength: 4
            },
            mensagem: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            email: {
                required: "Digite seu e-mail para finalizar",
                regx: "Seu email deve estar no formato nome@dominio.com",
                email: "Digite seu e-mail para finalizar"
            },
            nome: {
                required: "Digite seu nome para finalizar",
                regx: "Seu nome deve conter no mínimo 2 palavras, e não deve conter caracteres especiais",
                minlength: "Seu nome deve ter no mínimo 3 caracteres",
                nome: "Digite seu nome para finalizar"
            },
            assunto: {
                minlength: "O assunto deve ter no mínimo 4 caracteres",
                empresa: "Digite o assunto para finalizar"
            },
            mensagem: {
                minlength: "O mensagem deve ter no mínimo 4 caracteres",
                empresa: "Digite o mensagem para finalizar"
            },
        },
    };

    var formSelector = 'form[gama-form]';
	var form = $(formSelector);
    form.validate(options);

    $(document).on('submit', formSelector, function(e) {
        e.preventDefault();

        var $form = $(this);
        var data = {
            email: $form.find('[name="email"]').val(),
            nome: $form.find('[name="nome"]').val(),
            assunto: $form.find('[name="assunto"]').val(),
            mensagem: $form.find('[name="mensagem"]').val()
        };
        Email.send(
            'cadiversidade@gmail.com',
            'cadiversidade@gmail.com',
            '${data.assunto} - ${data.nome} - ${data.email}',
            data.mensagem,
            {
                token: '16813aec-e8b1-4f1a-8057-53b067db9686',
                callback: function done(message) {
                    console.log(message);
                    alert('Email enviado com sucesso!');
                    $form.trigger('reset');
                }
            }
        );
    })
}

$(function () {
    // Start after all dom has been loaded
    gama.initialize();
});