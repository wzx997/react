import JsonP from 'jsonp';

export default class Axions {
    static jsonp(options){
        return new Promise((resolve, reject) => {
            JsonP(options.url,{
                param:'callback'
            },function (err, response) {

            })
        })
    }
}