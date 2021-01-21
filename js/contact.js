$("#contactForm").submit(function(event) {
    event.preventDefault();
    $("#messageFormButton").prop("disabled",true);
    var local = false;
    var url = local ? "http://localhost:4000/api/email" : "https://anker-peet.herokuapp.com/api/email";

    var messageObj = {
        "email": $("#email").val(),
        "message": $("#message").val()
    }

    console.log(messageObj)

    $.post(url, messageObj).then(res => {
        console.log("res: ", res);
    }).fail(err => {
        console.log("Failed to send.", err);
    }).always(() => {
        $("#messageFormButton").prop("disabled",false);
    });
});