var gama = [];

gama.initialize = function () {
    // Initialize everything
    gama.setupFirebase();
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

$(function () {
    // Start after all dom has been loaded
    gama.initialize();
});