package com.example.IMSBACKEND.exception;

import java.time.LocalDate;

public class NoListFoundMonthYearException extends RuntimeException{

    public NoListFoundMonthYearException(int month, int year){
        super("No inventory was logged in '" + month + " " + year + "'.");
    }
}
