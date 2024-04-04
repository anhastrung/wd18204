<?php
$filename = $_FILES['file']['name'];
$location = '/uploads/' . $filename;
if(move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
    echo 'http://localhost:3000' . $location;
} else {
    echo 0;
}