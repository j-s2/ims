package com.example.IMSBACKEND.exception;

import java.time.LocalDate;

public class NoListFoundException extends RuntimeException {
    public NoListFoundException(LocalDate date){
        super("No inventory was logged on " + date + ".");

    }
}
