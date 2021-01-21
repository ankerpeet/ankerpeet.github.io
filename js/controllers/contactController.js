function ContactController(){
	var contactService = new ContactService();
	
    $("#contactForm").submit(function(event) {
        event.preventDefault();
        $("#messageFormButton").prop("disabled",true);
        contactService.sendMessage(function(data){
            console.log(data);
            var template = `<div class="alert alert-success" >${data.message}</div>`
            $("#alert").html(template);
            $("#alert").show();
            $("#messageFormButton").prop("disabled",false); 
            setTimeout(function(){ $("#alert").hide(); }, 5000);           
        })
    });
}