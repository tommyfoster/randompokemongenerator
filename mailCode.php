<?php
require_once('recaptchalib.php');
if ($_POST){
	if(isset($_POST['captcha']) && !empty($_POST['captcha'])){
        $privatekey = "6LdzSCIUAAAAAGTC6VtrBMj8Wr6rGgPheqnjnRJ8";

        //get verified response data
        $param = "https://www.google.com/recaptcha/api/siteverify?secret=".$privatekey."&response=".$_POST['captcha'];
        $verifyResponse = file_get_contents($param);
        $responseData = json_decode($verifyResponse);

        if($responseData->success){
			$name = $_POST['name'];
			$name = ucwords(strtolower($name));
			$tier = $_POST['tier'];
			$teamtext = $_POST['teamtext'];
			$teamtext = rtrim($teamtext);
			$teamtextformat = str_replace(array("\r\n"), "\\n\\\n", $teamtext);
			$message = '"' . $name . '"' . ": {\n" . "name: "  . '"' . $name . '"' . ",\ntier: " . "'" . $tier . "'" . ",\ndata: " . '"' . $teamtextformat . "\\n" . '"' . "\n" . '}';
			if ($teamtext != '' && $name != '' && $tier != '') {
				mail('pyrotozteams@hotmail.com','TEAM: ' . '"' . $name . '"' . ' (' . $tier . ')',"Raw:\n\n" . $teamtext . "\n\nImportable:\n\n" . $message);
				echo "<script type='text/javascript'>alert('Thank you for submitting your team!');</script>";
			}
			else {
				echo "<script type='text/javascript'>alert('Error! Team name and text cannot be blank.');</script>";
			}

        }else{
            // failure
            echo "<script type='text/javascript'>alert('Error! Invalid reCaptcha!');</script>";
        }
    }else{
        // user didn't enter reCAPTCHA
        echo "<script type='text/javascript'>alert('Error! Please complete reCaptcha!');</script>";
    }
}
?>