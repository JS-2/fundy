package com.ilovefundy.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@CrossOrigin(origins = {"*"})
@RestController
public class UserController {
    @PostMapping("/user/login")
    public ResponseEntity<Void> login(String email, String password){
        Optional<Void> userOpt = null;

        // 유저 정보가 존재
        if(userOpt.isPresent()){
            return new ResponseEntity(HttpStatus.OK);
        }
        // 유저 정보가 없음
        else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

    }

    
}
