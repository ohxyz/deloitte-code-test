function promiseGetLaunches() {

    var url  = 'http://127.0.0.1:8001/launches';
    var url2 = 'http://127.0.0.1:8001/launchpads';

    return Promise.all( [ fetch( url ), fetch( url2 ) ] );
}

export {

    promiseGetLaunches,
}