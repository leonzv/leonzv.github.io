<?php
function check_input($data){
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
return $data;
}
    header('Content-Type: text/html; charset=utf-8');
    if(isset($_POST['email']) && !empty($_POST['email'])){

$name = addslashes($_POST['name']);
$email = addslashes($_POST['email']);
$message = check_input($_POST['message']);
$to = "leowfce@gmail.com";
$subject = "Portfolio Github";
$body = "Nome: ".$name. "\n".
        "Email: ".$email. "\n".
        "Mensagem: " .$message;

$header = "From:leowfce@gmail.com"."\r\n"."Reply-To: ".$email."\r\n"
            ."X=Mailer:PHP/".phpversion();

if(mail($to,$subject,$body,$header)){
    echo"Email enviado com sucesso!";
}else{
    echo"Houve um erro com o email!";
    
}
}   
?>
