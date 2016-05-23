function populate(frm, data) {   
    $.each(data, function(key, value){  
    var $ctrl = $('[name='+key+']', frm);  
    switch($ctrl.attr("type"))  
    {  
        case "text" :   
        case "hidden":  
        $ctrl.val(value);   
        break;   
        case "radio" : case "checkbox":   
        $ctrl.each(function(){
           if($(this).attr('value') == value) {  $(this).attr("checked",value); } });   
        break;  
        default:
        $ctrl.val(value); 
    }  
    });  
};

$.extend($.expr[":"], {
    "containsIN": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

$(function () {
    $('#putDiagForm').hide();
    $('html').attr('lang', 'ru');
    if(window.location.hash != "") {
        $('a[href="' + window.location.hash + '"]').click();
    }

    $('#analysisTabs li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('#analysisParams div').eq($(this).index()).addClass('active').siblings().removeClass('active');
        $('#analysisContent div').eq($(this).index()).addClass('active').siblings().removeClass('active');
    });

    $('#diagSubmit').click(function (e) {
        e.preventDefault();
        $.post( "/write_diag", $( "#putDiagForm" ).serialize(), function() {
            $('#putDiagnosisModal').modal('hide');
        });
        return false;
    });
    $('#patientsSearch').keyup(function() {
        var val = $(this).val();
        if (!val) {
            $('#patientsList .patient').show();
        } else {
            $('#patientsList .patient').hide();
            $('#patientsList .patient:containsIN("' + val + '")').show();
        }
    });
    $('#modalPatientsSearch').keyup(function() {
        var val = $(this).val();
        if (!val) {
            $('#modalPatients tr').show();
        } else {
            $('#modalPatients tr').hide();
            $('#modalPatients tr:containsIN("' + val + '")').show();
        }
    });
    $('#patientForm').validator().on('submit', function (e) {
        event.preventDefault();
        if (e.isDefaultPrevented()) {
            // handle the invalid form...
        } else {
            $.post( "/write_patient", $( "#patientForm" ).serialize(), function() {
                window.location = "#patients";
                location.reload();
            });
        }
        return false;
    });
    $('#patientSubmit').click(function (e) {
        $("#patientForm").submit();
    });
    $("#editPatientModal").on('hidden.bs.modal', function () {
        $("#patientForm").get(0).reset();
        $("#patientForm").validator('destroy');
        $("#patientForm").validator();
    });
    $('#editPatientModal').on('shown.bs.modal', function () {
        var key = $(arguments[0].relatedTarget).data('id');
        if (!key) {
            return;
        }
        $.get( "/get_patient", {id: key}, function(data) {
            populate($('#patientForm'), data.fields);
            $('#patientForm input[name="id"]').val(data.pk);
        });
    });
    $('.removePatientBtn').click(function () {
        var key = $(this).data('id');
        var self = this;
        if (!key) {
            return;
        }
        $.get( "/remove_patient", {id: key}, function(data) {
            $(self).parents('tr').remove();
        });
    });
    $('.selectPatientBtn').click(function () {
        var key = $(this).data('id');
        $('.modal.in').modal('hide');
        if (!key) {
            return;
        }
        $.get( "/get_patient", {id: key}, function(data) {
            $('#putDiagForm').show();
            $('#diagModalEmpty').hide();
            $('#putDiagForm input[name="id"]').val(data.pk);
            $('#putDiagForm textarea').val(data.fields.diagnosis);
            $('#patientInfo').html('<strong>' + data.fields.last_name + 
                ' ' + data.fields.first_name + ' '  + data.fields.middle_name + 
                '</strong> (возраст - ' +  data.fields.age + ')');
        });
    });
});