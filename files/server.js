const app = require('koa')(),
    fs = require('fs'),
    request = require('co-request');

const cert = fs.readFileSync('/ssl/cert.pem'),
    key = fs.readFileSync('/ssl/key.pem'),
    ca = fs.readFileSync('/ssl/ca.pem'),
    host = process.env.DOCKER_HOST.substr(6);

app.use(function *(){
    if (this.url !== '/') {    
        var container = this.url.slice(1);

        var options = {
            url: 'https://'+host+'/containers/'+container+'/json',
            cert: cert,
            key: key,
            ca: ca
        };

        var info = yield request(options);

        if (info.statusCode == 200) {
            options.url = 'https://'+host+'/containers/create';
            options.json = true;
            options.body = JSON.parse(info.body).Config;
            options.body.Hostname = "";
            options.body.HostConfig = JSON.parse(info.body).HostConfig;
            var init = yield request.post(options);

            options.url = 'https://'+host+'/containers/'+init.body.Id+'/start';
            options.body = null;
            var start = yield request.post(options);

            this.status = 200;
            this.body = 'done';
        } else {
            this.status = 404;
            this.body = 'invalid container id'; 
        }
    } else {
        this.status = 400;
        this.body = 'container id missing';
    }
});

app.listen(3000);