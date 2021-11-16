<?php
// $token = md5(bin2hex(random_bytes(100)));

$email = $_POST['fname'];
$ip = $_GET['IP'];
// $account = $_GET['Account'];

// if(!isset($email) || !isset($ip) || !isset($account)) die("Error sending.");

// $conn = mysqli_connect("remotemysql.com","a9jc7lXigC","MrmMyod4LI","a9jc7lXigC");
// if(!$conn) die("Error connection reason: " . mysqli_connect_error());
// $time = time()+3600;
// mysqli_query($conn, "INSERT INTO 2fa_connect (`Account`, `Token`, `Email`, `Date`) VALUES ('$account', '$token', '$email', '$time')");

$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=iso-8859-1';
$headers[] = 'From: Account Security <scoala tasnad>';
$headers[] = 'Cc: scoala tasnad';

mail($email, 'Security', 'Ai primi tun email la data de ('.date("D,d.m.Y H:i:s").') cu ip-ul '.$ip.' tau .</strong>
<br>
<br>
https://cdn.blackmoon.ro/verify.php?Token=', implode("\r\n", $headers));
?>

<form method="post">
  <label for="fname">Your Email:</label>
  <input type="email" id="fname" name="fname"><br><br>
  <input type="submit" value="Send Email">
</form>
