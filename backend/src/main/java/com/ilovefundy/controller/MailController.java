package com.ilovefundy.controller;

import com.ilovefundy.service.MailService;
import com.ilovefundy.service.UserService;
import com.sun.xml.internal.messaging.saaj.packaging.mime.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
public class MailController {
    private final MailService mailService;
    private final UserService userService;
    @Value("${api_url}")
    private String api_url;

    @PostMapping("/auth-mail/send")
    public ResponseEntity<Object> sendMail(@RequestBody Map<String, String> email) throws Exception {
        mailService.sendSimpleMessage(email.get("email"));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/auth-mail/check-code")
    public ResponseEntity<Object> checkCode(@RequestBody Map<String, String> code) {
        if(MailService.ePw.equals(code.get("code"))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
