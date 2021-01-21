export function init() {
    $("#contactForm").submit(function(event) {
        $("#messageFormButton").prop("disabled",true);

        event.preventDefault();
        var url = "http://localhost:4000/api/email";

        var messageObj = {
            "email": $("#email").val(),
            "message": $("#message").val()
        }

        console.log(messageObj)

        $.post(url, JSON.stringify(messageObj)).then(res => {
            console.log("res: ", res);
        }).fail(err => {
            console.log("Failed to send.", err);
        }).always(() => {
            $("#messageFormButton").prop("disabled",false);
        });
    });
}