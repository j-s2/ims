package com.example.IMSBACKEND.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionAdvice {

    //response body should be a string

    //handle DateNotValidException
    @ExceptionHandler(DateNotValidException.class)
    public ResponseEntity<String> handleDateNotValidException(DateNotValidException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoListFoundException.class)
    public ResponseEntity<String> handleNoListFoundException(NoListFoundException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ItemNotFoundException.class)
    public ResponseEntity<String> handleItemNotFoundException(ItemNotFoundException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoListFoundMonthYearException.class)
    public ResponseEntity<String> handleNoListNotFoundMonthYearException(NoListFoundMonthYearException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }



}
