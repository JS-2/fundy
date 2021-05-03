package com.ilovefundy.controller;

import com.ilovefundy.service.MailService;
import com.ilovefundy.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
public class MailController {
    private final MailService mailService;
    private final UserService userService;

    @PostMapping("/auth-mail/send")
    public ResponseEntity<Object> sendMail(@RequestBody Map<String, String> email) throws Exception {
        Map<String, String> result = new HashMap<>();
        mailService.sendSimpleMessage(email.get("email"));
        result.put("message", "이메일을 전송하였습니다. 코드를 확인해주세요");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/auth-mail/check-code")
    public ResponseEntity<Object> checkCode(@RequestBody Map<String, String> code) {
        Map<String, String> result = new HashMap<>();

        if(MailService.ePw.equals(code.get("code"))) {
            result.put("message", "이메일 인증에 성공하였습니다");
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            result.put("message", "올바르지 않은 코드입니다");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
}
