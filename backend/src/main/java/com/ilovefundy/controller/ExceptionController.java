package com.ilovefundy.controller;

import com.ilovefundy.advice.exception.CAuthenticationEntryPointException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ExceptionController {
    @GetMapping(value = "/exception/entrypoint")
    public ResponseEntity<Object> entrypointException() {
        throw new CAuthenticationEntryPointException("해당 리소스에 접근하기 위한 권한이 없습니다.");
    }

    @GetMapping(value = "/exception/accessdenied")
    public ResponseEntity<Object> accessdeniedException() {
        throw new AccessDeniedException("보유한 권한으로 접근할 수 없는 리소스입니다.");
    }
}
