package com.ilovefundy.advice;

import com.ilovefundy.advice.exception.CAuthenticationEntryPointException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {
    @ExceptionHandler(CAuthenticationEntryPointException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<Object> authenticationEntryPointException(HttpServletRequest request, CAuthenticationEntryPointException e) {
        Map<String, Object> result = new HashMap<>();
        result.put("message", "해당 리소스에 접근하기 위한 권한이 없습니다.");
        return new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<Object> accessDeniedException(HttpServletRequest request, AccessDeniedException e) {
        Map<String, Object> result = new HashMap<>();
        result.put("message", "보유한 권한으로 접근할 수 없는 리소스입니다.");
        return new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
    }
}
