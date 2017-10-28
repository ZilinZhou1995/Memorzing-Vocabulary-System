/**
 * Created by Jiahui on 4/10/17.
 */
var config = {
    development: {
        frontEndAppDir: "/Users/Jiahui/Documents/GraduationDesign/frontend/app",
        homepage:"http://localhost:3000",
        server: {
            port: 3000
        }
    }
};


//exports interface development
module.exports = config[process.env.NODE_ENV || 'development'];
