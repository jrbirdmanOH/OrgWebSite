/*
** This works in conjunction with the contactusform.html file.
*/

function onAgreeToTermsChange(ctrl) {
    var agreed = ctrl.checked;
    var sendButton = document.getElementById("sendButton");
    sendButton.disabled = !agreed;
}

function contactPark() {
    contactPark('','','','','');
}

function contactPark(contactType) {
    contactPark(contactType,'','','','');
}

//contactType must be events, chautauqua, weddings, realestate.  Any thing else will be a generic park message.
function contactPark(contactType, contactPhone, contactCallWindow, contactEmail, cottageNumber) {

    gtag('event','contactPark_click', {
        'Type': contactType,
        'Phone': contactPhone,
        'callWindow': contactCallWindow,
        'contactEmail': contactEmail,
        'cottageNumber': cottageNumber
    });

    var message = '';
    var serviceValue = 0;
    var dialogTitle = '';
    var emailCC = '';

    switch(contactType) {
        case 'events':
            message = 'I am interested upcoming events or performing at Epworth.';
            serviceValue = 3;
            emailSendTo = 'sanichols14@gmail.com';
            emailCC = 'june.diehl@outlook.com';
            contactPhone = '';
            contactCallWindow='';
            contactTitle = 'our Event Planner';
            break;
        case 'chautauqua':
            message = 'I am interested in being a vendor or performing at this year\'s Chautauqua Homecoming Days.';
            serviceValue = 2;
            emailSendTo = 'mmcouttsgray@hotmail.com;duncan.bruce@att.net';
            emailCC = '';
            contactPhone = '';
            contactCallWindow='';
            contactTitle = 'our Chautauqua Planners';
            break;
        case 'realestate':
            message = 'I am interested in purchasing Cottage #' + cottageNumber + ' at Epworth Park.';
            serviceValue = 1;
            emailSendTo = contactEmail;
            emailCC = 'oleanbirds2@windstream.net;dgreenjeans@aol.com';
            contactPhone = contactPhone;
            contactCallWindow = contactCallWindow;
            contactTitle = 'the Cottage Owner';
            break;
        case 'weddings':
            message = 'I am considering having my wedding at Epworth Park.';
            serviceValue = 4;
            emailSendTo = 'joodipooh@aol.com';
            emailCC = '';
            contactPhone = '740-310-4250';
            contactCallWindow = 'after 5 PM ET';
            contactTitle = 'our Wedding Coordinator';
            break;
        default:
            message = '';
            serviceValue = 0;
            emailSendTo = 'epworthpark@gmail.com';
            emailCC = '';
            contactPhone = '';
            contactCallWindow = '';
            contactTitle = 'park management';
            break;
    }

    $("#message").text(message);
    $("#service").val(serviceValue);
    if (contactPhone != '') {
        if (contactCallWindow != '') {
            dialogTitle = 'Contact ' + contactTitle + ' @ ' + contactPhone + ' ' + contactCallWindow + ' or use the contact form below';
        } else {
            dialogTitle = 'Contact ' + contactTitle + ' @ ' + contactPhone + ' or use the contact form below';
        }
    } else {
        dialogTitle = 'Contact ' + contactTitle;
    }
    $("#exampleModalLabel").text(dialogTitle);
    $("#emailSendTo").val(emailSendTo);
    $("#emailCC").val(emailCC);
    $('#btnTrigger').click();
}

// Using new smtp.js script
function processSendButton() {

    var sendFrom = "epworthpark@gmail.com"; //"info@epworthpark.org";
    var name = $('#first_name').val() + ' ' + $('#last_name').val();
    var service = $('#service option:selected').text();
    var sendTo = $('#emailSendTo').val();
    var cc = $("#emailCC").val();
    var phone = $('#phone').val();
    var zip = $('#zip-code').val();
    var emailAddr = $('#emailaddr').val();
    var message = $('#message').val();
    // var ret = '<br />'; //for SMTP
    var ret = '%0D%0A'; //for mailto:

    var body = 'Name: ' + name + ret;
    body += 'Phone Number: ' + phone + ret; 
    body += 'Zip Code: ' + zip + ret; 
    body += 'Email Address:' + emailAddr + ret;
    body += 'Service: ' + service + ret; 
    body += 'Message:' + ret + message.replace(/\n/g, ret) + ret; 
    body += ret; //extra blank line at bottom

    var url = 'mailto:' + sendTo;
    url += '?subject=ATTENTION REQUIRED: Contact from web site';
    if (cc!= "") {
        url += '&CC=' + cc;
    }
    url += '&body=' + body;

    window.location.href=url;

    gtag('event','sendEmail', {
        'sendTo': sendTo,
        'name': name,
        'service': service,
        'phone': phone,
        'zip': zip,
        'email': emailAddr,
        'message': message
    });

    $("#btnCloseModal").click();
}

$(function() {
    $('#btnTrigger').hide();
});


