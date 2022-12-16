function ContactService() {
	this.sendMessage = function (cb) {
        var local = false;
        var url = local ? "http://localhost:4000/api/email" : "https://anker-peet.herokuapp.com/api/email";
    
        var messageObj = {
            "email": $("#email").val(),
            "message": $("#message").val()
        }
    
        $.post(url, messageObj).then(res => {
            $("#email").val("")
            $("#message").val("")
            cb(res);
        }).fail(err => {
            cb(err);
        })
	}
}