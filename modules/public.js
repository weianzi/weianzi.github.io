/**
 * Created on 2015-01-21.
 */
define(function(require, exports, module){

    function Hi(){
        this.name = "买好茶上茶途网，世界级名品授权、100%正品保证！";
    }

    Hi.prototype.showMe = function(){

        $("#box").html( this.name );

    };

    //通过 module.exports 提供整个接口
    module.exports = Hi;

});