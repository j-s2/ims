package com.example.IMSBACKEND.exception;

public class DateNotValidException extends RuntimeException{

    public DateNotValidException(String date) {
        super("Date " + date + " is invalid.");
    }
}
