/**
 * This is for the common API used in the file controllers
 */


exports.get_return_data = function get_return_data(successful, body, code, message) {
    var data = {
        successful: successful,
        body: body
    };

    if (!successful) {
        data.errorCode = code;
        data.errorMessage = message;
    }
    return data;
}