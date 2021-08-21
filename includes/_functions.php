<?php
    function getCurrentFilename() : string {
        return pathinfo($_SERVER['SCRIPT_NAME'])['filename'];
    }
?>