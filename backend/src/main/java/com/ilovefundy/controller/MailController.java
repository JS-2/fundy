package com.ilovefundy.controller;

import com.ilovefundy.dto.user.CodeRequest;
import com.ilovefundy.dto.user.EmailRequest;
import com.ilovefundy.service.MailService;
import com.ilovefundy.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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

    @ApiOperation(value = "인증코드 메일로 전송", notes = "인증코드 전송")
    @ApiResponses({
            @ApiResponse(code = 200, message = "인증코드 전송 성공. OK !!"),
    })
    @PostMapping("/auth-mail/send")
    public ResponseEntity<Object> sendMail(@RequestBody EmailRequest req) throws Exception {
        Map<String, String> result = new HashMap<>();
        mailService.sendSimpleMessage(req.getEmail());
        result.put("message", "이메일을 전송하였습니다. 코드를 확인해주세요");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "인증코드 확인", notes = "인증코드 확인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "이메일 인증성공. OK !!"),
            @ApiResponse(code = 400, message = "올바르지 않은 인증코드. OK !!"),
    })
    @PostMapping("/auth-mail/check-code")
    public ResponseEntity<Object> checkCode(@RequestBody CodeRequest req) {
        Map<String, String> result = new HashMap<>();

        if(MailService.ePw.equals(req.getCode())) {
            result.put("message", "이메일 인증에 성공하였습니다");
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            result.put("message", "올바르지 않은 코드입니다");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
}
